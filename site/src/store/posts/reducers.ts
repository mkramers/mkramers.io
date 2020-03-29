import {CREATE_POST, DELETE_POSTS, LOAD_POSTS, PostActionTypes, POSTED_LOADED, PostsState, SELECT_POST} from './types'
import {LoadStatus} from "../util/LoadStatus";
import {normalizePosts} from "./normalizePosts";

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
        case DELETE_POSTS:
            let postIds = action.posts.map(post => post.postId);

            const byId = {
                ...state.posts.byId
            };
            postIds.forEach(postId => {
                delete byId[postId];
            });
            let allIds = state.posts.allIds.filter(id => !postIds.includes(id));

            return {
                ...state,
                posts: {
                    allIds,
                    byId
                }
            };
        default:
            return state
    }
}