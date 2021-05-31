export const ACTIONS = {
  SET_COMMENTS: "comments/set_comments",
  SET_AGREE_FOR_APPOINTMENT: "comments/set_agree_for_appointment",
  GET_LEAD_SOURCE: "comments/get_lead_source",
  CREATE_CALL: "comments/create_call",
  ADD_ALT_NO: "comments/add_alt_no",
  SET_LOADING: "comments/set_loading",
};

interface SetComments {
  type: typeof ACTIONS.SET_COMMENTS;
  payload: Object;
}
interface SetAgreeForAppointment {
  type: typeof ACTIONS.SET_AGREE_FOR_APPOINTMENT;
  payload: Object;
}

interface CreateCall {
  type: typeof ACTIONS.CREATE_CALL;
  payload: Object;
}
interface GetLeadSource {
  type: typeof ACTIONS.GET_LEAD_SOURCE;
  payload: Object;
}
interface AddAltNo {
  type: typeof ACTIONS.ADD_ALT_NO;
  payload: Object;
}
interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type CommentTypes =
  | SetComments
  | SetLoadng
  | SetAgreeForAppointment
  | CreateCall
  | GetLeadSource
  | AddAltNo;
