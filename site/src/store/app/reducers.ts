import axios from "axios";
import {API_INITIALIZED, AppActionTypes, AppState, INIT_API} from "./types";
import {LoadStatus} from "../../types/Post";

const initialState: AppState = {
    api: undefined,
    apiInitialized: LoadStatus.PENDING,
};

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
        case INIT_API:

            console.log("TOKEN: " + action.token);
            const api = axios.create({
                // baseURL: 'https://demo.mkramers.io:4000/graphql',
                baseURL: 'http://localhost:5000',
                headers: {
                    Authorization: `Bearer ${action.token}`
                },
                timeout: 1000,
            });

            return {
                ...state,
                api: api
            };
        case API_INITIALIZED:
            return {
                ...state,
                apiInitialized: action.loaded
            };
        default:
            return state
    }
}