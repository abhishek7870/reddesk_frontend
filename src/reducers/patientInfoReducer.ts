import {
  ACTIONS,
  PatientInfoTypes,
} from "../interfaces/actionTypes/PatientInfoTypes";

type PatientInitialState = {
  data: object;
  loading_form_1: boolean;
  loading_form_2: boolean;
  loading_form_3: boolean;
  loading_form_4: boolean;
};

const initialState: PatientInitialState = {
  data: {},
  loading_form_1: false,
  loading_form_2: false,
  loading_form_3: false,
  loading_form_4: false,
};

const patientInfoReducer = (state = initialState, action: PatientInfoTypes) => {
  switch (action.type) {
    case ACTIONS.SET_TREATMENT_DETAILS:
      return {
        ...state,
        data: action.payload,
        loading_form_1: false,
      };
    case ACTIONS.SET_RELEVANT_DETAILS:
      return {
        ...state,
        data: action.payload,
        loading_form_2: false,
      };
    case ACTIONS.SET_MEDICAL_HISTORY:
      return {
        ...state,
        data: action.payload,
        loading_form_3: false,
      };
    case ACTIONS.SET_OTHER_INFO:
      return {
        ...state,
        data: action.payload,
        loading_form_4: false,
      };
    case ACTIONS.SET_LOADING_FORM_1:
      return {
        ...state,
        loading_form_1: action.payload,
      };
    case ACTIONS.SET_LOADING_FORM_2:
      return {
        ...state,
        loading_form_2: action.payload,
      };
    case ACTIONS.SET_LOADING_FORM_3:
      return {
        ...state,
        loading_form_3: action.payload,
      };
    case ACTIONS.SET_LOADING_FORM_4:
      return {
        ...state,
        loading_form_4: action.payload,
      };
    default:
      return state;
  }
};

export default patientInfoReducer;
