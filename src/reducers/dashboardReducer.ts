import {
  ACTIONS,
  DashboardTypes,
} from "../interfaces/actionTypes/dashboardTypes";

type DashboardInitialState = {
  patient_data: object;
  sms_templates: object;
  search_results: object;
  loading: boolean;
};

const initialState: DashboardInitialState = {
  patient_data: {},
  sms_templates: {},
  search_results: {},
  loading: false,
};

const dashboardReducer = (state = initialState, action: DashboardTypes) => {
  switch (action.type) {
    case ACTIONS.SET_PATIENT_DETAILS:
      return {
        ...state,
        patient_data: action.payload,
        loading: false,
      };
    case ACTIONS.SEARCH_CALL:
      return {
        ...state,
        search_results: action.payload,
        loading: false,
      };

    case ACTIONS.CLICK_TO_CALL:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.GET_SMS_TEMPLATES:
      return {
        ...state,
        sms_templates: action.payload,
        loading: false,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
