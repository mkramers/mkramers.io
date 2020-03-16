import {ChatActionTypes, ChatState, DELETE_MESSAGE, LOAD_POSTS, SEND_MESSAGE} from './types'

const initialState: ChatState = {
    messages: [],
    posts: []
};

export function chatReducer(
    state = initialState,
    action: ChatActionTypes
): ChatState {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                )
            };
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state
    }
}