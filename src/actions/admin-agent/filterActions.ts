import { ACTIONS } from "../../interfaces/actionTypes/adminActionTypes/filterTypes";
import AXIOS from "../../config/Axios";
import Prefix from "../../config/ApiPrefix";
import snackBarUpdate from "../../actions/snackBarActions";
import SecureStorage from "../../config/SecureStorage";

export const getCallFilterData = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/call-filter/`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    dispatch({ type: ACTIONS.GET_CALLS_FILTER_DATA, payload: data });
  } catch (err) {
    let title = "";
    if (err.response) {
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

export const getAppointmentFilterData = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/appointments-data/`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_APPOINTMENT_FILTER_DATA, payload: data });
  } catch (err) {
    let title = "";
    if (err.response) {
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
