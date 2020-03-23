import { postsReducer } from './posts/reducers'
import {combineReducers} from "redux";
import { History } from 'history'
import {connectRouter, RouterState} from 'connected-react-router'

export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    main: postsReducer
});

export interface State {
    router: RouterState
    main: ReturnType<typeof postsReducer>
}

export default rootReducer;