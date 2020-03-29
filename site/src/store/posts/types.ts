import {LoadStatus} from "../util/LoadStatus";
import {NormalizedObjects} from "../util/NormalizedObject";

export interface Post {
    postId: number,
    authorUserId: number;
    title: string;
    content: string;
}

export interface PostsState {
    posts: NormalizedObjects<Post>,
    postsLoaded: LoadStatus,
    selectedPostId?: number
}

export const LOAD_POSTS = 'LOAD_POSTS';
export const POSTED_LOADED = 'POSTED_LOADED';
export const SELECT_POST = 'SELECT_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POSTS = 'DELETE_POSTS';

interface LoadPostsAction {
    type: typeof LOAD_POSTS
    posts: Post[]
}

interface PostsLoadedAction {
    type: typeof POSTED_LOADED
    loaded: LoadStatus
}

interface SelectPostAction {
    type: typeof SELECT_POST
    postId: number
}

interface CreatePostAction {
    type: typeof CREATE_POST
    post: Post
}

interface DeletePostsAction {
    type: typeof DELETE_POSTS
    posts: Post[]
}

export type PostActionTypes = LoadPostsAction | SelectPostAction | PostsLoadedAction | CreatePostAction | DeletePostsAction;