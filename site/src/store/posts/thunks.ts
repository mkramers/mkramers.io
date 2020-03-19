import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../index";
import {loadPosts, postsLoaded, selectPost} from "./actions";
import axios from "axios";
import {LoadStatus} from "../../types/Post";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>

export const thunkLoadPosts = (): AppThunk => async dispatch => {
    dispatch(postsLoaded(LoadStatus.PENDING));

    let posts = null;
    try {
        posts = await loadPostsApi();
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

async function loadPostsApi() {
    const instance = axios.create({
        // baseURL: 'https://demo.mkramers.io:4000',
        baseURL: 'http://localhost:5000',
        timeout: 1000,
    });

    let result = await instance.post('/graphql', {"query": `{
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