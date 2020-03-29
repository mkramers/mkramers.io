import {createPost, loadPosts, postsLoaded, selectPost} from "./actions";
import {AxiosInstance} from "axios";
import {AppThunk} from "../AppThunk";
import {LoadStatus} from "../LoadStatus";
import {Post} from "./types";

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

    if (posts.length > 0) {
        let firstPost = posts[0];
        dispatch(selectPost(firstPost.postId));
    }
    dispatch(postsLoaded(LoadStatus.SUCCESS));
};

async function loadPostsApi(api: AxiosInstance | undefined) {
    if (api === undefined) {
        throw new Error("Api not initialized!");
    }

    let result = await api.post('/graphql', {"query": `
    query Query {
        allPosts {
            edges {
                  node {
                        title
                        content
                        authorUserId
                        postId
                }
            }
        }
    }`});

    let postsObject = result.data.data.allPosts.edges.map((edge: any) => edge.node);
    let posts = Object.keys(postsObject).map(key => postsObject[key]);

    return Promise.resolve(posts);
}


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

    let result = await api.post('/graphql', {"query": `
        mutation MyMutation {
           createPost(input: {post: {authorUserId: 1, title: "${post.title}", content: "${post.content}"}}) {
               clientMutationId
               post {
                  postId
                  authorUserId
                  content
                  title
               }
           }
    }`});

    let createPost = result.data.data.createPost.post;
    return createPost;
}