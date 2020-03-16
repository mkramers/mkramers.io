import {PostActionTypes, LOAD_POSTS} from './types'
import {Post} from "../../types/Post";

export function loadPosts(posts: Post[]): PostActionTypes {
    return {
        type: LOAD_POSTS,
        payload: posts
    }
}