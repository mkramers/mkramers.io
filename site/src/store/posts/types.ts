import {NormalizedObjects, Post} from "../../types/Post";

export interface PostsState {
    posts: NormalizedObjects<Post>,
    postsLoaded: Boolean,
    selectedPostId?: number
}

export const LOAD_POSTS = 'LOAD_POSTS';
export const POSTED_LOADED = 'POSTED_LOADED';
export const SELECT_POST = 'SELECT_POST';

interface LoadPostsAction {
    type: typeof LOAD_POSTS
    posts: Post[]
}

interface PostsLoadedAction {
    type: typeof POSTED_LOADED
    loaded: Boolean
}

interface SelectPostAction {
    type: typeof SELECT_POST
    postId: number
}

export type PostActionTypes = LoadPostsAction | SelectPostAction | PostsLoadedAction;