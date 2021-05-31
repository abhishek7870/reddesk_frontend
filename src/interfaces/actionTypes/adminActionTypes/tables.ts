export const ACTIONS = {
  GET_ALL_CALLS: "admin/get_all_calls",
  GET_ALL_POSITIVE_CALLS: "admin/get_all_positive_calls",
  GET_ALL_APPOINTMENTS: "admin/get_all_appointments",
  GET_RECORDINGS: "admin/get_recordings",
  SEARCH_CALL: "admin/search_call",
  SET_LOADING: "admin/set_loading",
};

interface GetAllCalls {
  type: typeof ACTIONS.GET_ALL_CALLS;
  payload: Object;
}

interface GetAllPositiveCalls {
  type: typeof ACTIONS.GET_ALL_CALLS;
  payload: Object;
}

interface GetAllAppointments {
  type: typeof ACTIONS.GET_ALL_APPOINTMENTS;
  payload: Object;
}
interface GetRecordings {
  type: typeof ACTIONS.GET_RECORDINGS;
  payload: Object;
}
interface SearchCall {
  type: typeof ACTIONS.SEARCH_CALL;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type TableTypes =
  | GetAllCalls
  | SetLoadng
  | GetAllPositiveCalls
  | GetAllAppointments
  | GetRecordings
  | SearchCall;
