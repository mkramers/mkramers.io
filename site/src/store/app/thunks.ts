import {AppThunk} from "../AppThunk";
import {apiInitialized, initApi} from "./actions";
import {LoadStatus} from "../../types/Post";

export const thunkInitApi = (token: string | undefined): AppThunk => async (dispatch) => {
    console.log("THUNK!");
   dispatch(apiInitialized(LoadStatus.PENDING));

   dispatch(initApi(token));

    dispatch(apiInitialized(LoadStatus.SUCCESS));
};