export const ACTIONS = {
  GET_PANEL_USERS: "admin/get_panel_users",
  LEAD_TRANSFER_BY_COMMA: "admin/lead_transfer_by_comma",
  GET_LEAD_TRANSFER_BY_CITY_FIELDS: "admin/get_lead_transfer_by_city_fields",
  LEAD_TRANSFER_BY_CITY: "admin/lead_transfer_by_city",
  REJECT_CALL: "admin/reject_call",
  OPERATOR_TRANSFER: "admin/operator_transfer",
  SET_LOADING: "admin/set_loading",
};

interface GetPanelUsers {
  type: typeof ACTIONS.GET_PANEL_USERS;
  payload: Object;
}

interface LeadTransferByComma {
  type: typeof ACTIONS.LEAD_TRANSFER_BY_COMMA;
  payload: Object;
}

interface GetLeadTransferByCityFields {
  type: typeof ACTIONS.GET_LEAD_TRANSFER_BY_CITY_FIELDS;
  payload: Object;
}

interface LeadTransferByCity {
  type: typeof ACTIONS.LEAD_TRANSFER_BY_CITY;
  payload: Object;
}

interface RejectCalls {
  type: typeof ACTIONS.REJECT_CALL;
  payload: Object;
}
interface OperatorTransfer {
  type: typeof ACTIONS.OPERATOR_TRANSFER;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type LeadTransferTypes =
  | GetPanelUsers
  | SetLoadng
  | LeadTransferByComma
  | GetLeadTransferByCityFields
  | LeadTransferByCity
  | OperatorTransfer
  | RejectCalls;
