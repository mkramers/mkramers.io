import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import {rootReducer} from "./index";
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk
            ),
        ),
    );

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./index', () => {
            store.replaceReducer(rootReducer(history));
        });
    }

    return store
}