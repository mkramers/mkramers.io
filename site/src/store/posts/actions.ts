// src/store/chat/actions.ts

import {ChatActionTypes, DELETE_MESSAGE, LOAD_POSTS, Message, SEND_MESSAGE} from './types'
import {Post} from "../../types/Post";

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newMessage: Message): ChatActionTypes {
    return {
        type: SEND_MESSAGE,
        payload: newMessage
    }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(timestamp: number): ChatActionTypes {
    return {
        type: DELETE_MESSAGE,
        meta: {
            timestamp
        }
    }
}

export function loadPosts(posts: Post[]): ChatActionTypes {
    return {
        type: LOAD_POSTS,
        payload: posts
    }
}