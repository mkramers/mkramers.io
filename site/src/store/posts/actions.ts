import {LOAD_POSTS, PostActionTypes, SELECT_POST} from './types'
import {Post} from "../../types/Post";

export function loadPosts(posts: Post[]): PostActionTypes {
    return {
        type: LOAD_POSTS,
        payload: posts
    }
}

export function selectPost(postId: number): PostActionTypes {
    return {
        type: SELECT_POST,
        postId: postId
    }
}