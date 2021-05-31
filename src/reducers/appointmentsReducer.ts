import {
  ACTIONS,
  AppointmentTypes,
} from "../interfaces/actionTypes/appointmentTypes";

type AppointmentInitialState = {
  todays_appnt: object;
  create_appnt_field_data: object;
  read_appointment_data: object;
  loading: boolean;
  edit_appointment_loading_1: boolean;
  edit_appointment_loading_2: boolean;
};

const initialState: AppointmentInitialState = {
  todays_appnt: {},
  create_appnt_field_data: {},
  read_appointment_data: {},
  loading: false,
  edit_appointment_loading_1: false,
  edit_appointment_loading_2: false,
};

const appointmentsReducer = (
  state = initialState,
  action: AppointmentTypes
) => {
  switch (action.type) {
    case ACTIONS.SET_TODAY_APPOINTMENTS:
      return {
        ...state,
        todays_appnt: action.payload,
        loading: false,
      };
    case ACTIONS.GET_APPOINTMENT_FIELDS:
      return {
        ...state,
        create_appnt_field_data: action.payload,
        loading: false,
      };
    case ACTIONS.CREATE_NEW_APPOINTMENT:
      return {
        ...state,

        loading: false,
      };
    case ACTIONS.READ_APPOINTMENT:
      return {
        ...state,
        read_appointment_data: action.payload,
        loading: false,
      };
    case ACTIONS.EDIT_APPOINTMENT:
      return {
        ...state,

        edit_appointment_loading_1: false,
      };
    case ACTIONS.EDIT_APPOINTMENT_STATUS:
      return {
        ...state,

        edit_appointment_loading_2: false,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_EDIT_LOADING_1:
      return {
        ...state,
        edit_appointment_loading_1: action.payload,
      };
    case ACTIONS.SET_EDIT_LOADING_2:
      return {
        ...state,
        edit_appointment_loading_2: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
