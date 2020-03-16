import {PostActionTypes, PostsState, LOAD_POSTS} from './types'

const initialState: PostsState = {
    posts: []
};

export function postsReducer(
    state = initialState,
    action: PostActionTypes
): PostsState {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state
    }
}