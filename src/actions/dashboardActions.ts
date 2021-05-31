import { ACTIONS } from "../interfaces/actionTypes/dashboardTypes";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import snackBarUpdate from "../actions/snackBarActions";
import SecureStorage from "../config/SecureStorage";

export const patientDetails = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(`${Prefix.api}/lead/dashboard/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.SET_PATIENT_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const searchCall = (body: any) => async (dispatch: Function) => {
  const { search_by, value } = body;
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/search-lead/`,
      {
        search_by,
        value,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SEARCH_CALL, payload: data });
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

export const clickToCall = (id: number, contact_type: string) => async (
  dispatch: Function
) => {
  try {
    await AXIOS.get(`${Prefix.api}/lead/clicktocall/${id}/${contact_type}/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.CLICK_TO_CALL, payload: null });
    snackBarUpdate({
      payload: {
        message: "Call Succeded",
        status: true,
        type: "success",
      },
    })(dispatch);
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

export const getSMSTemplates = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/communication/send-templates/`
    );
    dispatch({ type: ACTIONS.GET_SMS_TEMPLATES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
