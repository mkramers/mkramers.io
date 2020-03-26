import {AxiosInstance} from "axios";

export interface AppState {
    api: AxiosInstance | undefined;
}

export const INIT_API = 'INIT_API';

interface InitApiAction {
    type: typeof INIT_API
    token: string | undefined;
}

export type AppActionTypes = InitApiAction;