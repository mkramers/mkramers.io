import React from 'react';
import {AppContainer} from 'react-hot-loader'
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import configureStore, {history} from "./store/configureStore";
import "./index.css"
import {Auth0Provider} from "./auth0/react-auth0-spa";
import config from "./auth_config.json";
import App from "./components/App";

const store = configureStore();

//temp - allows store to be displayed in console for debugging
// @ts-ignore
window.store = store;

// // A function that routes the user to the right place
// // after login
// const onRedirectCallback = (appState: any) => {
//     history.push(
//         appState && appState.targetUrl
//             ? appState.targetUrl
//             : window.location.pathname
//     );
// };

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
    // Clears auth0 query string parameters from url
    const targetUrl = redirectResult
    && redirectResult.appState
    && redirectResult.appState.targetUrl
        ? redirectResult.appState.targetUrl
        : window.location.pathname;

    history.push(targetUrl)
};

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Auth0Provider
                domain={config.domain}
                audience={config.audience}
                client_id={config.clientId}
                redirect_uri={window.location.origin}
                onRedirectCallback={onAuthRedirectCallback}
            >
                <Provider store={store}>
                    <App history={history}/>
                </Provider>
            </Auth0Provider>
        </AppContainer>, document.getElementById('root'));
};

render();

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./components/App', () => {
        render()
    })
}
