import {AxiosInstance} from "axios";
import {LoadStatus} from "../LoadStatus";

export interface AppState {
    api: AxiosInstance | undefined;
    apiInitialized: LoadStatus
}

export const INIT_API = 'INIT_API';
export const API_INITIALIZED = 'API_INITIALIZED';

interface InitApiAction {
    type: typeof INIT_API
    token: string | undefined;
}

interface ApiInitializedAction {
    type: typeof API_INITIALIZED
    loaded: LoadStatus
}

export type AppActionTypes = InitApiAction | ApiInitializedAction