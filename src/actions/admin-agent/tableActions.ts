import { ACTIONS } from "../../interfaces/actionTypes/adminActionTypes/tables";
import { ACTIONS as ALT_ACTIONS } from "../../interfaces/actionTypes/dashboardTypes";
import AXIOS from "../../config/Axios";
import Prefix from "../../config/ApiPrefix";
import snackBarUpdate from "../../actions/snackBarActions";
import SecureStorage from "../../config/SecureStorage";

export const getAllCalls = (query: string, page: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const URL = page > 1 ? `${query}-lead/?page=${page}` : `${query}-lead/`;
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/${URL}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_CALLS, payload: data });
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

export const getFilteredCalls = (url: string) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/calls-filter/${url}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_CALLS, payload: data });
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

// export const getPaginatedFilteredCalls = (url: string) => async (
//   dispatch: Function
// ) => {
//   dispatch({ type: ACTIONS.SET_LOADING, payload: true });

//   try {
//     const { data } = await AXIOS.get(
//       url,

//       { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
//     );
//     dispatch({ type: ACTIONS.GET_ALL_CALLS, payload: data });
//   } catch (err) {
//     let title = "";
//     if (err.response) {
//       title = err.response.data.error;
//     } else {
//       title = "Something went wrong!";
//     }
//     snackBarUpdate({
//       payload: {
//         message: title,
//         status: true,
//         type: "error",
//       },
//     })(dispatch);
//     dispatch({ type: ACTIONS.SET_LOADING, payload: false });
//     throw err;
//   }
// };

// export const getPaginatedFilteredPositiveCalls = (url: string) => async (
//   dispatch: Function
// ) => {
//   dispatch({ type: ACTIONS.SET_LOADING, payload: true });

//   try {
//     const { data } = await AXIOS.get(
//       url,

//       { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
//     );
//     dispatch({ type: ACTIONS.GET_ALL_POSITIVE_CALLS, payload: data });
//   } catch (err) {
//     let title = "";
//     if (err.response) {
//       title = err.response.data.error;
//     } else {
//       title = "Something went wrong!";
//     }
//     snackBarUpdate({
//       payload: {
//         message: title,
//         status: true,
//         type: "error",
//       },
//     })(dispatch);
//     dispatch({ type: ACTIONS.SET_LOADING, payload: false });
//     throw err;
//   }
// };
// export const getPaginatedFilteredAppointments = (url: string) => async (
//   dispatch: Function
// ) => {
//   dispatch({ type: ACTIONS.SET_LOADING, payload: true });

//   try {
//     const { data } = await AXIOS.get(
//       url,

//       { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
//     );
//     dispatch({ type: ACTIONS.GET_ALL_APPOINTMENTS, payload: data });
//   } catch (err) {
//     let title = "";
//     if (err.response) {
//       title = err.response.data.error;
//     } else {
//       title = "Something went wrong!";
//     }
//     snackBarUpdate({
//       payload: {
//         message: title,
//         status: true,
//         type: "error",
//       },
//     })(dispatch);
//     dispatch({ type: ACTIONS.SET_LOADING, payload: false });
//     throw err;
//   }
// };

export const getFilteredPositiveCalls = (url: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/positive-filter/${url}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_POSITIVE_CALLS, payload: data });
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

export const getAllPositiveCalls = (query: string, page: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const URL =
      page > 1
        ? `${query}-positive-lead/?page=${page}`
        : `${query}-positive-lead/`;
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/${URL}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_POSITIVE_CALLS, payload: data });
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

export const getAllAppointments = (query: string, page: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const URL =
      page > 1
        ? `${query}-appointment-lead/?page=${page}`
        : `${query}-appointment-lead/`;
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/${URL}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_APPOINTMENTS, payload: data });
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

export const getFilteredAppointments = (url: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/appointment-filter/${url}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_ALL_APPOINTMENTS, payload: data });
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

export const searchCall = (body: any) => async (dispatch: Function) => {
  const { search_by, value } = body;
  dispatch({ type: ALT_ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/admin/search/`,
      {
        search_by,
        value,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ALT_ACTIONS.SEARCH_CALL, payload: data });
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

export const getAllRecordings = (url: string) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/admin/incoming-call-recording/${url ? url : ""}`,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.GET_RECORDINGS, payload: data });
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
