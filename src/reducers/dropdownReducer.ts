import {
  ACTIONS,
  DropdownTypes,
} from "../interfaces/actionTypes/dropdownTypes";

type DropdownInitialState = {
  center_list: object;
  appointment_filter_data: object;
  calls_filter_data: object;
  cities: object;
  loading: boolean;
};

const initialState: DropdownInitialState = {
  center_list: {},
  appointment_filter_data: {},
  calls_filter_data: {},
  cities: {},
  loading: false,
};

const dropdownReducer = (state = initialState, action: DropdownTypes) => {
  switch (action.type) {
    case ACTIONS.GET_CENTER_LIST:
      return {
        ...state,
        center_list: action.payload,
        loading: false,
      };
    case ACTIONS.GET_APPOINTMENT_FILTER_DATA:
      return {
        ...state,
        appointment_filter_data: action.payload,
        loading: false,
      };
    case ACTIONS.GET_CALLS_FILTER_DATA:
      return {
        ...state,
        calls_filter_data: action.payload,
        loading: false,
      };
    case ACTIONS.GET_CITIES_DROPDOWN:
      return {
        ...state,
        cities: action.payload,
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

export default dropdownReducer;
