import { systemReducer } from './system/reducers'
import { postsReducer } from './posts/reducers'
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    system: systemReducer,
    main: postsReducer
});

export type RootState = ReturnType<typeof rootReducer>