export const ACTIONS = {
  GET_POSITIVE_CALLS: "positive_calls/set_today_positive_calls",
  READ_CALL_DETAILS: "positive_calls/read_call_details",
  GET_POSTIVE_CALLS_COMMENTS: "positive_calls/get_positive_calls_comments",
  ADD_POSTIVE_CALLS_COMMENT: "positive_calls/add_positive_calls_comment",
  ADD_COMMENT: "positive_calls/add_comment",
  SET_LOADING: "positive_calls/set_loading",
  SET_TABLE_LOADING: "positive_calls/set_table_loading",
};

interface GetPositiveCalls {
  type: typeof ACTIONS.GET_POSITIVE_CALLS;
  payload: Object;
}

interface ReadCallDetails {
  type: typeof ACTIONS.READ_CALL_DETAILS;
  payload: Object;
}

interface GetPositiveCallsComments {
  type: typeof ACTIONS.GET_POSTIVE_CALLS_COMMENTS;
  payload: Object;
}

interface AddPositiveCallsComments {
  type: typeof ACTIONS.ADD_POSTIVE_CALLS_COMMENT;
  payload: Object;
}

interface AddComment {
  type: typeof ACTIONS.ADD_COMMENT;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}
interface SetTableLoadng {
  type: typeof ACTIONS.SET_TABLE_LOADING;
  payload: boolean;
}

export type PositiveCallTypes =
  | GetPositiveCalls
  | ReadCallDetails
  | GetPositiveCallsComments
  | AddPositiveCallsComments
  | AddComment
  | SetLoadng
  | SetTableLoadng;
