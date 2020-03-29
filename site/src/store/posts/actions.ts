import {CREATE_POST, LOAD_POSTS, Post, PostActionTypes, POSTED_LOADED, SELECT_POST} from './types'
import {LoadStatus} from "../util/LoadStatus";

export function loadPosts(posts: Post[]): PostActionTypes {
    return {
        type: LOAD_POSTS,
        posts: posts
    }
}

export function postsLoaded(loaded: LoadStatus): PostActionTypes {
    return {
        type: POSTED_LOADED,
        loaded: loaded
    }
}

export function selectPost(postId: number): PostActionTypes {
    return {
        type: SELECT_POST,
        postId: postId
    }
}

export function createPost(post: Post): PostActionTypes {
    return {
        type: CREATE_POST,
        post: post
    }
}