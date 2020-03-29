import React, {useEffect} from 'react';
import {History} from 'history'
import {ConnectedRouter} from "connected-react-router";
import routes from "./routes";
import {useAuth0} from "./auth0/react-auth0-spa";
import {connect} from "react-redux";
import {thunkInitApi} from "./store/app/thunks";
import NavBar from "./components/NavBar";
import "./App.css"
import PostList from "./components/PostList";

interface AppProps {
    history: History;
    initApi: (token: string | undefined) => void,
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
            <div className="bp3-dark wrapper">
                <NavBar/>
                <div className="page-main">
                    <div className='left-column'>
                        <PostList/>
                    </div>
                    <div className='right-column'>
                        {routes}
                    </div>
                </div>
            </div>
        </ConnectedRouter>
    );
}

const mapState = () => ({});

const mapDispatch = {
    initApi: (token: string | undefined) => thunkInitApi(token)
};

const connector = connect(mapState, mapDispatch);

export default connector(App);
