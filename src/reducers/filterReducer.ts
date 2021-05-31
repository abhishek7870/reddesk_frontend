import { ACTIONS, FilterTypes } from "../interfaces/actionTypes/filterTypes";

type FilterInitialState = {
  filter_response_data: object;
  loading: boolean;
};

const initialState: FilterInitialState = {
  filter_response_data: {},
  loading: false,
};

const filterReducer = (state = initialState, action: FilterTypes) => {
  switch (action.type) {
    case ACTIONS.SET_APPOINTMENT_FILTER:
      return {
        ...state,
        filter_response_data: action.payload,
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

export default filterReducer;
