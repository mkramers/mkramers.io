import {API_INITIALIZED, AppActionTypes, INIT_API} from "./types";
import {LoadStatus} from "../LoadStatus";

export function initApi(token: any): AppActionTypes {
    return {
        type: INIT_API,
        token
    }
}

export function apiInitialized(loaded: LoadStatus): AppActionTypes {
    return {
        type: API_INITIALIZED,
        loaded: loaded
    }
}