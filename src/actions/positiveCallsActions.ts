import { ACTIONS } from "../interfaces/actionTypes/positiveCallTypes";
import snackBarUpdate from "../actions/snackBarActions";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import SecureStorage from "../config/SecureStorage";

export const getPositiveCalls = (query: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_TABLE_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/positive-${query}-leads/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    dispatch({ type: ACTIONS.GET_POSITIVE_CALLS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginatedFilteredPositiveCalls = (url: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_TABLE_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      url,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_POSITIVE_CALLS, payload: data });
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
    dispatch({ type: ACTIONS.SET_TABLE_LOADING, payload: false });
    throw err;
  }
};

export const getPositiveCallsComments = (id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/lead-related-comments/${id}/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    console.log(data);
    dispatch({
      type: ACTIONS.GET_POSTIVE_CALLS_COMMENTS,
      payload: data.comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPositiveCallComment = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { comment, callId } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/lead-details/${callId}/`,
      {
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    // console.log(data);
    snackBarUpdate({
      payload: {
        message: "Created!",
        status: true,
        type: "success",
      },
    })(dispatch);

    dispatch({
      type: ACTIONS.ADD_POSTIVE_CALLS_COMMENT,
      payload: data.comments,
    });
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

export const readCallDetails = (callId: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/lead-details/${callId}/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    dispatch({ type: ACTIONS.READ_CALL_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { comment, callId } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/lead-details/${callId}/`,
      {
        comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    snackBarUpdate({
      payload: {
        message: "Created!",
        status: true,
        type: "success",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.ADD_COMMENT, payload: data.comments });
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
