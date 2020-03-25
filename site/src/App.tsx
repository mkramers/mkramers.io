import React from 'react';
import { History } from 'history'
import configureStore from "./store/configureStore";
import {ConnectedRouter} from "connected-react-router";
import routes from "./routes";
import {useAuth0} from "./auth0/react-auth0-spa";

interface AppProps {
    history: History;
}

function App({ history }: AppProps) {
    let store = configureStore({});

    const {loading} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    //temp - allows store to be displayed in console for debugging
    // @ts-ignore
    window.store = store;

    return (
        <ConnectedRouter history={history}>
            { routes }
        </ConnectedRouter>
    );
}

export default App;
