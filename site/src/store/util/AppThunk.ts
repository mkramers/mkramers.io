import {ThunkAction} from "redux-thunk";
import {State} from "../index";
import {Action} from "redux";

export type AppThunk = ThunkAction<void, State, unknown, Action<string>>