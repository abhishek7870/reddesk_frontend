import { ACTIONS } from "../../interfaces/actionTypes/adminActionTypes/leadTransfer";
import AXIOS from "../../config/Axios";
import Prefix from "../../config/ApiPrefix";
import snackBarUpdate from "../../actions/snackBarActions";
import SecureStorage from "../../config/SecureStorage";

export const leadTransfer = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/lead-transfer/`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_PANEL_USERS, payload: data });
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

export const leadTransferByComma = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  const { lead_ids, value, panel_user } = body;

  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/admin/lead-transfer/`,
      { lead_ids, value, panel_user },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.LEAD_TRANSFER_BY_COMMA, payload: data });
    snackBarUpdate({
      payload: {
        message: "Transferred!",
        status: true,
        type: "success",
      },
    })(dispatch);
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

export const leadTransferByCityFields = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/lead-transfer-by-city/`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_LEAD_TRANSFER_BY_CITY_FIELDS, payload: data });
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

export const leadTransferByCity = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  const {
    country,
    callstatus,
    city,
    treatment,
    from_user,
    to_user,
    priority,
    noofcall,
  } = body;

  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/admin/lead-transfer-by-city/`,
      {
        country,
        callstatus,
        city,
        treatment,
        from_user,
        to_user,
        priority,
        noofcall,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.LEAD_TRANSFER_BY_CITY, payload: data });
    let msg = data.status;
    snackBarUpdate({
      payload: {
        message: msg,
        status: true,
        type: "success",
      },
    })(dispatch);
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

export const RejectCalls = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  const { lead_ids, value, comment } = body;

  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/admin/lead-rejected/`,
      { lead_ids, value, comment },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.REJECT_CALL, payload: data });
    snackBarUpdate({
      payload: {
        message: "Rejected!",
        status: true,
        type: "success",
      },
    })(dispatch);
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

export const OperatorTransfer = (provider: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/admin/change-operator/`,
      { provider },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.OPERATOR_TRANSFER, payload: data });
    snackBarUpdate({
      payload: {
        message: "Transfered!",
        status: true,
        type: "success",
      },
    })(dispatch);
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
