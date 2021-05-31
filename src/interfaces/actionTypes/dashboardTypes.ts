export const ACTIONS = {
  SET_PATIENT_DETAILS: "dashboard/set_patient_details",
  SEARCH_CALL: "dashboard/search_call",
  CLICK_TO_CALL: "dashboard/click_to_call",
  GET_SMS_TEMPLATES: "dashboard/get_sms_templates",
  SET_LOADING: "dashboard/set_loading",
};

interface SetPatientDetails {
  type: typeof ACTIONS.SET_PATIENT_DETAILS;
  payload: Object;
}

interface SearchCall {
  type: typeof ACTIONS.SEARCH_CALL;
  payload: Object;
}

interface ClickToCall {
  type: typeof ACTIONS.CLICK_TO_CALL;
  payload: Object;
}
interface GetSMSTemplates {
  type: typeof ACTIONS.GET_SMS_TEMPLATES;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type DashboardTypes =
  | SetPatientDetails
  | SearchCall
  | SetLoadng
  | ClickToCall
  | GetSMSTemplates;
