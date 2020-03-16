import {Post} from "../../types/Post";

export interface PostsState {
    posts: Post[],
}

export const LOAD_POSTS = 'LOAD_POSTS';


interface LoadPostsAction {
    type: typeof LOAD_POSTS
    payload: Post[]
}

export type PostActionTypes = LoadPostsAction;