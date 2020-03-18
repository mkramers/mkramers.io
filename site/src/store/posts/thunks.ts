import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../index";
import {loadPosts, postsLoaded} from "./actions";
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
    }
    catch (e) {
        console.log("ERRORRRR", e);
    }

    if (!posts) {
        dispatch(postsLoaded(LoadStatus.FAILURE));
        return;
    }

    dispatch(loadPosts(posts));
    dispatch(postsLoaded(LoadStatus.SUCCESS));
};

async function loadPostsApi() {
    const instance = axios.create({
        baseURL: 'https://demo.mkramers.io:4000/graphql/',
        // baseURL: 'http://localhost:5000/graphql',
        timeout: 1000,
    });

    let result = await instance.post('/', {"query": `{
  getPosts {
    id,
    author,
    title,
    content
  }
}`});

    let posts = result.data.data.getPosts;
    return Promise.resolve(posts);
}