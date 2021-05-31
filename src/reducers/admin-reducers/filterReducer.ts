import {
  ACTIONS,
  FilterTypes,
} from "../../interfaces/actionTypes/adminActionTypes/filterTypes";

type InitialState = {
  calls_filter_data: object;
  appointment_filter_data: object;
  loading: boolean;
};

const initialState: InitialState = {
  calls_filter_data: {},
  appointment_filter_data: {},
  loading: false,
};

const AdminFilterReducer = (state = initialState, action: FilterTypes) => {
  switch (action.type) {
    case ACTIONS.GET_CALLS_FILTER_DATA:
      return {
        ...state,
        calls_filter_data: action.payload,
        loading: false,
      };
    case ACTIONS.GET_APPOINTMENT_FILTER_DATA:
      return {
        ...state,
        appointment_filter_data: action.payload,
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

export default AdminFilterReducer;
