import {createPost, deletePostsById, loadPosts, postsLoaded, selectPost} from "./actions";
import {AxiosInstance} from "axios";
import {AppThunk} from "../util/AppThunk";
import {LoadStatus} from "../util/LoadStatus";
import {Post} from "./types";
import {listToTree} from "../../util/listToTree";
import {push} from "connected-react-router";

export const thunkLoadPosts = (): AppThunk => async (dispatch, getState) => {
    dispatch(postsLoaded(LoadStatus.PENDING));

    let api = getState().app.api;
    let posts = null;
    try {
        posts = await loadPostsApi(api);
    } catch (e) {
        console.log("Error", e);
    }

    if (!posts) {
        dispatch(postsLoaded(LoadStatus.FAILURE));
        return;
    }

    dispatch(loadPosts(posts));
    //
    // if (posts.length > 0) {
    //     let firstPost = posts[0];
    //     dispatch(selectPost(firstPost.postId));
    // }
    dispatch(postsLoaded(LoadStatus.SUCCESS));
};

async function loadPostsApi(api: AxiosInstance | undefined) {
    if (api === undefined) {
        throw new Error("Api not initialized!");
    }

    let result = await api.post('/graphql', {
        "query": `
    query MyQuery {
  allPosts {
    nodes {
      authorUserId
      content
      icon
      id
      label
      parentId
      secondarylabel
    }
  }
}`
    });

    let postsObject = result.data.data.allPosts.nodes;
    let posts = fixRetrievedPosts(postsObject);
    return Promise.resolve(posts);
}

export const selectPostThunk = (postId: number): AppThunk => async (dispatch) => {
    dispatch(push(`/post/${postId}`));

    dispatch(selectPost(postId));
};

export const createPostThunk = (post: Post): AppThunk => async (dispatch, getState) => {
    let api = getState().app.api;

    let createdPost = null;
    try {
        createdPost = await createPostApi(post, api);
    } catch (e) {
        console.log("Error", e);
        return;
    }

    dispatch(createPost(createdPost));
};

async function createPostApi(post: Post, api: AxiosInstance | undefined) {
    if (api === undefined) {
        throw new Error("Api not initialized!");
    }

    let result = await api.post('/graphql', {
        "query": `
        mutation MyMutation {
           createPost(input: {post: {authorUserId: ${post.authorUserId}, parentId: ${post.parentId}, label: "${post.label}", secondarylabel: "${post.secondaryLabel}", icon: "${post.icon}", content: "${post.content}"}}) {
               clientMutationId
               post {
                  authorUserId
                  content
                  icon
                  id
                  label
                  parentId
                  secondarylabel
               }
           }
    }`
    });

    let postObject = result.data.data.createPost.post;
    postObject.children = [];

    return postObject;
}


export const deletePostsThunk = (postsIds: number[]): AppThunk => async (dispatch, getState) => {
    let api = getState().app.api;
    if (api === undefined) {
        throw new Error("Api not initialized!");
    }

    let deleteByPostIdQueries = postsIds.map(id => {
        return `postId_${id}: deletePostByPostId(input: {postId: ${id}}) {
                clientMutationId
                deletedPostId
            }\n`
    });
    let deletePostsQuery = `
    mutation deleteMultiple {
        ${deleteByPostIdQueries}
     }`;

    try {
        await api.post('/graphql', {
            "query": deletePostsQuery
        });
    } catch (e) {
        console.log("Error", e);
        return;
    }

    dispatch(deletePostsById(postsIds));
};

let fixRetrievedPosts = (postsObject: Post[]) => {
    let postsList = postsObject.map((postsObject: any) => {
        return postsObject as Post;
    });
    let posts = listToTree<Post>(postsList);
    return posts;
};