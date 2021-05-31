import {
  ACTIONS,
  TableTypes,
} from "../../interfaces/actionTypes/adminActionTypes/tables";

type InitialState = {
  all_calls: object;
  all_positive_calls: object;
  all_appointments: object;
  all_recordings: object;
  loading: boolean;
};

const initialState: InitialState = {
  all_calls: {},
  all_positive_calls: {},
  all_appointments: {},
  all_recordings: {},
  loading: false,
};

const AdminTableReducer = (state = initialState, action: TableTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CALLS:
      return {
        ...state,
        all_calls: action.payload,
        loading: false,
      };
    case ACTIONS.GET_ALL_POSITIVE_CALLS:
      return {
        ...state,
        all_positive_calls: action.payload,
        loading: false,
      };
    case ACTIONS.GET_ALL_APPOINTMENTS:
      return {
        ...state,
        all_appointments: action.payload,
        loading: false,
      };
    case ACTIONS.GET_RECORDINGS:
      return {
        ...state,
        all_recordings: action.payload,
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

export default AdminTableReducer;
