import {LOAD_POSTS, PostActionTypes, PostsState, SELECT_POST} from './types'
import {normalizePosts} from "../../types/Post";

const initialState: PostsState = {
    posts: {byId: {}, allIds: []},
    selectedPostId: undefined
};

export function postsReducer(
    state = initialState,
    action: PostActionTypes
): PostsState {
    switch (action.type) {
        case LOAD_POSTS:
            let normalizedPosts = normalizePosts(action.posts);

            return {
                ...state,
                posts: normalizedPosts
            };
        case SELECT_POST:
            return {
                ...state,
                selectedPostId: action.postId
            };
        default:
            return state
    }
}