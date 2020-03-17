import {LOAD_POSTS, PostActionTypes, POSTED_LOADED, PostsState, SELECT_POST} from './types'
import {LoadStatus, normalizePosts} from "../../types/Post";

const initialState: PostsState = {
    posts: {byId: {}, allIds: []},
    postsLoaded: LoadStatus.PENDING,
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
        case POSTED_LOADED:
            return {
                ...state,
                postsLoaded: action.loaded
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