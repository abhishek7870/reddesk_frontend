export const ACTIONS = {
  SET_TREATMENT_DETAILS: "patient_info/set_treatment_details",
  SET_RELEVANT_DETAILS: "patient_info/set_relevant_details",
  SET_MEDICAL_HISTORY: "patient_info/set_medical_history",
  SET_OTHER_INFO: "patient_info/set_other_info",
  SET_LOADING_FORM_1: "patient_info/set_loading_form_1",
  SET_LOADING_FORM_2: "patient_info/set_loading_form_2",
  SET_LOADING_FORM_3: "patient_info/set_loading_form_3",
  SET_LOADING_FORM_4: "patient_info/set_loading_form_4",
};

interface SetTreatmentDetails {
  type: typeof ACTIONS.SET_TREATMENT_DETAILS;
  payload: Object;
}
interface SetRelevantDetails {
  type: typeof ACTIONS.SET_RELEVANT_DETAILS;
  payload: Object;
}
interface SetMedicalHistory {
  type: typeof ACTIONS.SET_MEDICAL_HISTORY;
  payload: Object;
}
interface SetOtherInfo {
  type: typeof ACTIONS.SET_OTHER_INFO;
  payload: Object;
}
interface SetLoadng1 {
  type: typeof ACTIONS.SET_LOADING_FORM_1;
  payload: boolean;
}
interface SetLoadng2 {
  type: typeof ACTIONS.SET_LOADING_FORM_2;
  payload: boolean;
}
interface SetLoadng3 {
  type: typeof ACTIONS.SET_LOADING_FORM_3;
  payload: boolean;
}
interface SetLoadng4 {
  type: typeof ACTIONS.SET_LOADING_FORM_4;
  payload: boolean;
}

export type PatientInfoTypes =
  | SetTreatmentDetails
  | SetLoadng1
  | SetLoadng2
  | SetLoadng3
  | SetLoadng4
  | SetRelevantDetails
  | SetOtherInfo
  | SetMedicalHistory;
