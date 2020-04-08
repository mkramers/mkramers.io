import {
    CREATE_POST,
    DELETE_POSTS_BY_ID,
    LOAD_POSTS,
    Post,
    PostActionTypes,
    POSTED_LOADED,
    PostsState,
    SELECT_POST
} from './types'
import {LoadStatus} from "../util/LoadStatus";
import {normalizePosts} from "./normalizePosts";
import {NormalizedObjects} from "../util/NormalizedObject";
import produce from "immer";

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
            return state;
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

            let normalizedPost: NormalizedObjects<Post> = normalizePosts([post]);

            const nextState = produce(state, (draftState: any) => {
                draftState.posts.byId[post.id] = normalizedPost.byId[post.id];
                draftState.posts.byId[post.parentId].children.push(post.id);
            });

            return nextState;
        case DELETE_POSTS_BY_ID:
            let postIds = action.postIds;

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