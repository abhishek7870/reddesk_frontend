import {
  ACTIONS,
  PositiveCallTypes,
} from "../interfaces/actionTypes/positiveCallTypes";

type PositiveCallsInitialState = {
  todays_positive_calls: object;
  read_call_details: object;
  loading: boolean;
  tabel_loading: boolean;
};

const initialState: PositiveCallsInitialState = {
  todays_positive_calls: {},
  read_call_details: {},
  loading: false,
  tabel_loading: false,
};

const positiveCallsReducer = (
  state = initialState,
  action: PositiveCallTypes
) => {
  switch (action.type) {
    case ACTIONS.GET_POSITIVE_CALLS:
      return {
        ...state,
        todays_positive_calls: action.payload,
        tabel_loading: false,
      };
    case ACTIONS.GET_POSTIVE_CALLS_COMMENTS:
      return {
        ...state,
        todays_positive_calls: {
          ...state.todays_positive_calls,
          comments: action.payload,
        },
        loading: false,
      };
    case ACTIONS.ADD_POSTIVE_CALLS_COMMENT:
      return {
        ...state,
        todays_positive_calls: {
          ...state.todays_positive_calls,
          comments: action.payload,
        },
        loading: false,
      };
    case ACTIONS.READ_CALL_DETAILS:
      return {
        ...state,
        read_call_details: action.payload,
        loading: false,
      };

    case ACTIONS.ADD_COMMENT:
      return {
        ...state,
        read_call_details: {
          ...state.read_call_details,
          comments: action.payload,
        },
        loading: false,
      };
    case ACTIONS.SET_TABLE_LOADING:
      return {
        ...state,
        tabel_loading: action.payload,
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

export default positiveCallsReducer;
