import React, {useEffect} from 'react';
import {History} from 'history'
import {ConnectedRouter} from "connected-react-router";
import routes from "./routes";
import {useAuth0} from "./auth0/react-auth0-spa";
import {connect} from "react-redux";
import {thunkInitApi} from "./store/app/thunks";

interface AppProps {
    history: History;
    initApi:  (token: string | undefined) => void,
}

function App({history, initApi}: AppProps) {

    const {getTokenSilently, isAuthenticated, isInitializing} = useAuth0();

    useEffect(() => {
            if (!isInitializing) {
                if (isAuthenticated) {
                    getTokenSilently().then((token) => {
                        initApi(token);
                    });
                }
            }
        }, [isInitializing]
    );

    return (
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    );
}

const mapState = () => ({
});

const mapDispatch = {
    initApi: (token: string | undefined) => thunkInitApi(token)
};

const connector = connect(mapState, mapDispatch);

export default connector(App);
