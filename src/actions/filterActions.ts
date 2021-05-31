import { ACTIONS } from "../interfaces/actionTypes/appointmentTypes";
import { ACTIONS as actions } from "../interfaces/actionTypes/positiveCallTypes";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import snackBarUpdate from "../actions/snackBarActions";
import SecureStorage from "../config/SecureStorage";

export const setFilterOne = (url: string) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/appointment/filter/${url}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_TODAY_APPOINTMENTS, payload: data });
  } catch (err) {
    let title = "";
    if (err.response) {
      // console.log(err.response);
      title = err.response.data.error;
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    throw err;
  }
};

export const setFilterTwo = (url: string) => async (dispatch: Function) => {
  dispatch({ type: actions.SET_TABLE_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/filter/${url}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: actions.GET_POSITIVE_CALLS, payload: data });
  } catch (err) {
    let title = "";
    if (err.response) {
      // console.log(err.response);
      title = err.response.data.error;
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: actions.SET_TABLE_LOADING, payload: false });
    throw err;
  }
};
