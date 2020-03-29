import {AppThunk} from "../util/AppThunk";
import {apiInitialized, initApi} from "./actions";
import {LoadStatus} from "../util/LoadStatus";

export const thunkInitApi = (token: string | undefined): AppThunk => async (dispatch) => {
    dispatch(apiInitialized(LoadStatus.PENDING));

    dispatch(initApi(token));

    dispatch(apiInitialized(LoadStatus.SUCCESS));
};