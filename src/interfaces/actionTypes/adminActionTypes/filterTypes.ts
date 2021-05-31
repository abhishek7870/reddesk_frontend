export const ACTIONS = {
  GET_CALLS_FILTER_DATA: "admin/get_calls_filter_data",
  GET_APPOINTMENT_FILTER_DATA: "admin/get_appointment_filter_data",
  SET_LOADING: "admin/set_loading",
};

interface GetCallsFilterData {
  type: typeof ACTIONS.GET_CALLS_FILTER_DATA;
  payload: Object;
}
interface GetAppointmentFilterData {
  type: typeof ACTIONS.GET_APPOINTMENT_FILTER_DATA;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type FilterTypes =
  | GetCallsFilterData
  | SetLoadng
  | GetAppointmentFilterData;
