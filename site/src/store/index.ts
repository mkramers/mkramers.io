import { systemReducer } from './system/reducers'
import { chatReducer } from './posts/reducers'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
});

export type RootState = ReturnType<typeof rootReducer>