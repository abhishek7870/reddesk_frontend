export const ACTIONS = {
  GET_CENTER_LIST: "dropdown/get_center_list",
  GET_APPOINTMENT_FILTER_DATA: "dropdown/get_appointment_filter_data",
  GET_CALLS_FILTER_DATA: "dropdown/get_calls_filter_data",
  GET_CITIES_DROPDOWN: "dropdown/get_cities_dropdown",
  SET_LOADING: "dropdown/set_loading",
};

interface GetCenterList {
  type: typeof ACTIONS.GET_CENTER_LIST;
  payload: Object;
}

interface GetAppointmentFilterData {
  type: typeof ACTIONS.GET_APPOINTMENT_FILTER_DATA;
  payload: Object;
}

interface GetCallsFilterData {
  type: typeof ACTIONS.GET_CALLS_FILTER_DATA;
  payload: Object;
}

interface GetCitiesDropdown {
  type: typeof ACTIONS.GET_CITIES_DROPDOWN;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type DropdownTypes =
  | GetCenterList
  | SetLoadng
  | GetAppointmentFilterData
  | GetCitiesDropdown
  | GetCallsFilterData;
