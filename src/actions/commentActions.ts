import { ACTIONS } from "../interfaces/actionTypes/commentTypes";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import snackBarUpdate from "../actions/snackBarActions";
import SecureStorage from "../config/SecureStorage";

export const setComments = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { category, sub_category, lead_comment, comment } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/create-comment/`,
      {
        category,
        sub_category,
        lead_comment,
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_COMMENTS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
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

export const setRingComments = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { category, sub_category, lead_comment, comment } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/create-ringing-comment/`,
      {
        category,
        sub_category,
        lead_comment,
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_COMMENTS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
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

export const setCFreshComments = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const {
    category,
    sub_category,
    lead_comment,
    city,
    language,
    treatment,
    comment,
  } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/status-allot/`,
      {
        category,
        sub_category,
        lead_comment,
        city,
        language,
        treatment,
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_COMMENTS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
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

export const setDoesNotExistComments = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { category, sub_category, lead_comment, comment } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/create-no-comment/`,
      {
        category,
        sub_category,
        lead_comment,
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_COMMENTS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
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

export const setAgreeForAppointment = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { suggested_center, lead, comment, category } = body;
  console.log(body);
  try {
    await AXIOS.post(
      `${Prefix.api}/lead/agree-for-appointment/`,
      {
        suggested_center,
        category,
        lead,
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_AGREE_FOR_APPOINTMENT, payload: true });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
    // window.location.assign("/agent/dashboard/patient/create-appointment");
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

export const createCall = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { name, phone_no, treatment, source } = body;

  try {
    await AXIOS.post(
      `${Prefix.api}/lead/generate-lead-by-user/`,
      {
        name,
        phone_no,
        treatment,
        source,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.CREATE_CALL, payload: true });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
    // window.location.assign("/agent/dashboard/patient/create-appointment");
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

export const getLeadSource = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/lead-source/`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_LEAD_SOURCE, payload: data });
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

export const addAltNumber = (content_number: number, id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.patch(
      `${Prefix.api}/lead/lead/${id}/`,
      { content_number },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.ADD_ALT_NO, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
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
