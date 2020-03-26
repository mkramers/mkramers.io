import {AppActionTypes, INIT_API} from "./types";

export function initApi(token: string | undefined): AppActionTypes {
    return {
        type: INIT_API,
        token
    }
}