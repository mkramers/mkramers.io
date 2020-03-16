import {Post} from "../../types/Post";

export interface Message {
    user: string
    message: string
    timestamp: number
}

export interface ChatState {
    messages: Message[],
    posts: Post[],
}

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LOAD_POSTS = 'LOAD_POSTS';

interface SendMessageAction {
    type: typeof SEND_MESSAGE
    payload: Message
}

interface LoadPostsAction {
    type: typeof LOAD_POSTS
    payload: Post[]
}

interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE
    meta: {
        timestamp: number
    }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction | LoadPostsAction;