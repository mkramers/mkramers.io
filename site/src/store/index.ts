import { postsReducer } from './posts/reducers'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    main: postsReducer
});

export type RootState = ReturnType<typeof rootReducer>