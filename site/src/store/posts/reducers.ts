import {LOAD_POSTS, PostActionTypes, PostsState, SELECT_POST} from './types'

const initialState: PostsState = {
    posts: [],
    selectedPostId: undefined
};

export function postsReducer(
    state = initialState,
    action: PostActionTypes
): PostsState {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.posts,
                selectedPostId: action.posts.length > 0 ? 0 : undefined
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