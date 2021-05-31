import { ACTIONS } from "../interfaces/actionTypes/PatientInfoTypes";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import snackBarUpdate from "../actions/snackBarActions";
import SecureStorage from "../config/SecureStorage";

export const treatmentDetails = (body: any, id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING_FORM_1, payload: true });
  const {
    treatment,
    language,
    other_treatment,
    other_language,
    calling_gender,
    status,
  } = body;
  try {
    const { data } = await AXIOS.patch(
      `${Prefix.api}/lead/lead/${id}/`,
      {
        treatment,
        language,
        other_treatment,
        other_language,
        status,
        calling_gender,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    dispatch({ type: ACTIONS.SET_TREATMENT_DETAILS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
  } catch (err) {
    let title = "";
    title = "Something went wrong! Please Try Again";
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING_FORM_1, payload: false });
    throw err;
  }
};

export const relevantDetails = (body: any, id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING_FORM_2, payload: true });
  const {
    primary_name,
    primary_contact,
    husband_name,
    husband_age,
    wife_age,
    wife_name,
    loan_required,
    patient_classType,
    marriage_duration,
    patient_city,
    patient_area,
    treatment_city,
    budget,
  } = body;
  try {
    const { data } = await AXIOS.patch(
      `${Prefix.api}/lead/lead/${id}/`,
      {
        primary_name,
        primary_contact,
        husband_name,
        husband_age,
        wife_age,
        wife_name,
        loan_required,
        patient_classType,
        marriage_duration,
        patient_city,
        patient_area,
        treatment_city,
        budget,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    dispatch({ type: ACTIONS.SET_RELEVANT_DETAILS, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
  } catch (err) {
    let title = "";
    title = "Something went wrong! Please Try Again";
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING_FORM_2, payload: false });
    throw err;
  }
};

export const medicalHistory = (body: any, id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING_FORM_3, payload: true });
  const {
    any_baby,
    any_baby_process,
    consulted_with_any_doctors,
    consulted_with_any_doctors_name,
    trying_to_conceive,
    taken_any_fertility_treatment_in_past,
    treatment_result,
    treatment_history_name,
    doctor_feedback,
    doctor_description,
  } = body;
  try {
    const { data } = await AXIOS.patch(
      `${Prefix.api}/lead/lead/${id}/`,
      {
        any_baby,
        any_baby_process,
        consulted_with_any_doctors,
        consulted_with_any_doctors_name,
        trying_to_conceive,
        taken_any_fertility_treatment_in_past,
        treatment_result,
        treatment_history_name,
        doctor_feedback,
        doctor_description,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    dispatch({ type: ACTIONS.SET_MEDICAL_HISTORY, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
  } catch (err) {
    let title = "";
    title = "Something went wrong! Please Try Again";
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING_FORM_3, payload: false });
    throw err;
  }
};

export const setOtherInfo = (body: any, id: number) => async (
  dispatch: Function
) => {
  dispatch({ type: ACTIONS.SET_LOADING_FORM_4, payload: true });
  const {
    patient_aviability_day,
    patient_aviability_time,
    tentative_appt_Date,
    tentative_appt_time,
    priority,
    followup_date,
    followup_time,
    suggested_center,
  } = body;
  try {
    const { data } = await AXIOS.patch(
      `${Prefix.api}/lead/lead/${id}/`,
      {
        patient_aviability_day,
        patient_aviability_time,
        tentative_appt_Date,
        tentative_appt_time,
        priority,
        followup_date,
        followup_time,
        suggested_center,
      },
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    console.log(data);
    dispatch({ type: ACTIONS.SET_OTHER_INFO, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
  } catch (err) {
    let title = "";
    title = "Something went wrong! Please Try Again";
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING_FORM_4, payload: false });
    throw err;
  }
};
