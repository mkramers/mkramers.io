import {CREATE_POST, LOAD_POSTS, PostActionTypes, POSTED_LOADED, PostsState, SELECT_POST} from './types'
import {normalizePosts} from "../../types/Post";
import {LoadStatus} from "../LoadStatus";

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
        case CREATE_POST:
            let post = action.post;
            return {
                ...state,
                posts: {
                    byId:
                        {
                            ...state.posts.byId,
                            [post.postId]: post
                        },
                    allIds: state.posts.allIds.concat(post.postId)
                }
            };
        default:
            return state
    }
}