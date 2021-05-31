export const ACTIONS = {
  SET_APPOINTMENT_FILTER: "filter/set_appointment_filter",
  SET_LOADING: "dashboard/set_loading",
};

interface SetAppointmentFilter {
  type: typeof ACTIONS.SET_APPOINTMENT_FILTER;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type FilterTypes = SetAppointmentFilter | SetLoadng;
