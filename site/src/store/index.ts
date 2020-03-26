import { postsReducer } from './posts/reducers'
import {combineReducers} from "redux";
import { History } from 'history'
import {connectRouter, RouterState} from 'connected-react-router'
import {appReducer} from "./app/reducers";

export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    posts: postsReducer
});

export interface State {
    router: RouterState
    app: ReturnType<typeof appReducer>
    posts: ReturnType<typeof postsReducer>
}

export default rootReducer;