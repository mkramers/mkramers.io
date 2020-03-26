import React, {useEffect, useState} from 'react';
import {History} from 'history'
import {ConnectedRouter} from "connected-react-router";
import routes from "./routes";
import {useAuth0} from "./auth0/react-auth0-spa";
import {connect} from "react-redux";
import {State} from "./store";
import {initApi} from "./store/app/actions";

interface AppProps {
    history: History;
    initApi: any
}

function App({history, initApi}: AppProps) {
    const [isAppInitialized, setIsAppInitialized] = useState(false);

    const {getTokenSilently, isAuthenticated, loginWithRedirect, isInitializing} = useAuth0();

    useEffect(() => {
            if (!isInitializing) {
                if (isAuthenticated) {
                    getTokenSilently().then((token: string | undefined) => {
                        initApi(token);
                        setIsAppInitialized(true);
                    });
                } else {
                    loginWithRedirect({
                        appState: {targetUrl: "/"}
                    }).then(() => setIsAppInitialized(true));
                }
            }
        }, [isInitializing]
    );

    if (!isAppInitialized) {
        return <div>NO</div>;
    }

    return (
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    );
}

const mapState = (state: State) => ({
    postsLoaded: state.posts.postsLoaded
});

const mapDispatch = {
    initApi
};

const connector = connect(mapState, mapDispatch);

export default connector(App);
