import {LOAD_POSTS, PostActionTypes, POSTED_LOADED, SELECT_POST} from './types'
import {Post} from "../../types/Post";

export function loadPosts(posts: Post[]): PostActionTypes {
    return {
        type: LOAD_POSTS,
        posts: posts
    }
}

export function postsLoaded(loaded: Boolean): PostActionTypes {
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