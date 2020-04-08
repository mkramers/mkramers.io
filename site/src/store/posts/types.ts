import {LoadStatus} from "../util/LoadStatus";
import {NormalizedObjects} from "../util/NormalizedObject";

export interface Post extends TreeChild<Post>{
    authorUserId: number;
    label: string;
    secondaryLabel: string;
    icon: string;
    content: string;
}

export interface TreeChild<T> {
    id: number,
    parentId: number,
    children: T[]
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
export const DELETE_POSTS_BY_ID = 'DELETE_POSTS';

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

interface DeletePostsByIdAction {
    type: typeof DELETE_POSTS_BY_ID
    posts: Post[]
}

export type PostActionTypes = LoadPostsAction | SelectPostAction | PostsLoadedAction | CreatePostAction | DeletePostsByIdAction;