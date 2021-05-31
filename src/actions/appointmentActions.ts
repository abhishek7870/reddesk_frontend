import { ACTIONS } from "../interfaces/actionTypes/appointmentTypes";
import snackBarUpdate from "../actions/snackBarActions";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import SecureStorage from "../config/SecureStorage";

export const getAppointments = (query: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/appointment/${query}-appointments/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    dispatch({ type: ACTIONS.SET_TODAY_APPOINTMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginatedFilteredAppointments = (url: string) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(
      url,

      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.SET_TODAY_APPOINTMENTS, payload: data });
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

export const getAppointmentsFields = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { lead } = body;
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/lead/book-appointment/${lead}/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    dispatch({ type: ACTIONS.GET_APPOINTMENT_FIELDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createNewAppointment = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const {
    lead,
    doctor,
    center,
    appointment_date,
    appointment_time,
    treatment,
    follow_up_date,
    follow_up_time,
    comment_type,
    fix_comment,
    comment,
    pcc,
    pvac,
    package_amt,
  } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/lead/book-appointment/${lead}/`,
      {
        doctor,
        appointment_date,
        appointment_time,
        center,
        treatment,
        follow_up_date,
        follow_up_time,
        comment_type,
        fix_comment,
        comment,
        pcc,
        pvac,
        package_amt,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.CREATE_NEW_APPOINTMENT, payload: data });
    snackBarUpdate({
      payload: {
        message: "Created!",
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

export const readAppointment = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  const { lead } = body;
  try {
    const { data } = await AXIOS.get(
      `${Prefix.api}/appointment/appointments/${lead}/`,
      {
        headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
      }
    );
    dispatch({ type: ACTIONS.READ_APPOINTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editAppointment = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_EDIT_LOADING_1, payload: true });
  const { comment_type, fix_comment, add_comment, lead } = body;
  console.log(add_comment);
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/appointment/appointments/${lead}/`,
      {
        comment_type,
        fix_comment,
        add_comment,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );

    dispatch({ type: ACTIONS.EDIT_APPOINTMENT, payload: data });
    snackBarUpdate({
      payload: {
        message: "Created!",
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
    dispatch({ type: ACTIONS.SET_EDIT_LOADING_1, payload: false });
    throw err;
  }
};

export const editAppointmentStatus = (body: any) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_EDIT_LOADING_2, payload: true });
  const { status, apptId, lead_id } = body;
  try {
    const { data } = await AXIOS.post(
      `${Prefix.api}/appointment/appointments-status/${apptId}/${status}/${lead_id}/`,
      {
        status,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.EDIT_APPOINTMENT_STATUS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Created!",
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
    dispatch({ type: ACTIONS.SET_EDIT_LOADING_2, payload: false });
    throw err;
  }
};
