import axios from "axios";
import {API_INITIALIZED, AppActionTypes, AppState, INIT_API} from "./types";
import {LoadStatus} from "../util/LoadStatus";

const initialState: AppState = {
    api: undefined,
    apiInitialized: LoadStatus.PENDING,
};

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    let apiUrl = process.env.REACT_APP_API_URL;
    switch (action.type) {
        case INIT_API:
            const api = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `Bearer ${action.token}`
                },
                timeout: 3000,
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