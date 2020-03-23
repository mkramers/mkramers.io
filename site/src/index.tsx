import React from 'react';
import {AppContainer} from 'react-hot-loader'
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {history} from "./store/configureStore";
import "./index.css"

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history}/>
            </Provider>
        </AppContainer>, document.getElementById('root'));
}

render();

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./App', () => {
        render()
    })
}
