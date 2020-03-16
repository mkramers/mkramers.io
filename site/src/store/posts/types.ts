import {Post} from "../../types/Post";

export interface PostsState {
    posts: Post[],
    selectedPostId?: number
}

export const LOAD_POSTS = 'LOAD_POSTS';
export const SELECT_POST = 'SELECT_POST';

interface LoadPostsAction {
    type: typeof LOAD_POSTS
    posts: Post[]
}

interface SelectPostAction {
    type: typeof SELECT_POST
    postId: number
}

export type PostActionTypes = LoadPostsAction | SelectPostAction;