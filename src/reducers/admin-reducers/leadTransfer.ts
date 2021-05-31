import {
  ACTIONS,
  LeadTransferTypes,
} from "../../interfaces/actionTypes/adminActionTypes/leadTransfer";

type InitialState = {
  user_panel: object;
  lead_transfer_by_city_fields: object;
  loading: boolean;
};

const initialState: InitialState = {
  user_panel: {},
  lead_transfer_by_city_fields: {},
  loading: false,
};

const leadTransferReducer = (
  state = initialState,
  action: LeadTransferTypes
) => {
  switch (action.type) {
    case ACTIONS.GET_PANEL_USERS:
      return {
        ...state,
        user_panel: action.payload,
        loading: false,
      };
    case ACTIONS.LEAD_TRANSFER_BY_COMMA:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.GET_LEAD_TRANSFER_BY_CITY_FIELDS:
      return {
        ...state,
        lead_transfer_by_city_fields: action.payload,
        loading: false,
      };
    case ACTIONS.LEAD_TRANSFER_BY_CITY:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.REJECT_CALL:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.OPERATOR_TRANSFER:
      return {
        ...state,
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

export default leadTransferReducer;
