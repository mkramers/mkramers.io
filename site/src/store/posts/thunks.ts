import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../index";
import {loadPosts, postsLoaded} from "./actions";
import {Post} from "../../types/Post";
import axios from "axios";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>

export const thunkLoadPosts = (): AppThunk => async dispatch => {
    const posts = await loadPostsApi();
    dispatch(loadPosts(posts));
    dispatch(postsLoaded(true));
};

async function loadPostsApi() {
    const instance = axios.create({
        baseURL: 'http://localhost:4000/graphql/',
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