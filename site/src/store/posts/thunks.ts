import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {State} from "../index";
import {loadPosts, postsLoaded, selectPost} from "./actions";
import {AxiosInstance} from "axios";
import {LoadStatus} from "../../types/Post";

export type AppThunk = ThunkAction<void, State, unknown, Action<string>>

export const thunkLoadPosts = (): AppThunk => async (dispatch, getState) => {
    dispatch(postsLoaded(LoadStatus.PENDING));

    let api = getState().app.api;
    let posts = null;
    try {
        posts = await loadPostsApi(api);
    } catch (e) {
        console.log("ERRORRRR", e);
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

    let result = await api.post('/graphql', {"query": `{
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