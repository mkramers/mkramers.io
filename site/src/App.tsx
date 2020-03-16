import React from 'react';
import MainPage from "./components/MainPage";
import {rootReducer} from "./store";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

function App() {
    const store = configureStore({
        reducer: rootReducer
    });

    //temp - allows store to be displayed in console for debugging
    // @ts-ignore
    window.store = store;

    return (
        <Provider store={store}>
            <MainPage/>
        </Provider>
    );
}

export default App;
