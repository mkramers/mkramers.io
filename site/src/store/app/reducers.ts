import axios from "axios";
import {AppActionTypes, AppState, INIT_API} from "./types";

const initialState: AppState = {
    api: undefined
};

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
        case INIT_API:
            const api = axios.create({
                // baseURL: 'https://demo.mkramers.io:4000/graphql',
                baseURL: 'http://localhost:5000/graphql',
                headers: {
                    Authorization: `Bearer ${action.token}`
                },
                timeout: 1000,
            });

            return {
                ...state,
                api: api
            };
        default:
            return state
    }
}