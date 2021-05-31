export const ACTIONS = {
  SET_TODAY_APPOINTMENTS: "appointments/set_today_appointments",
  GET_APPOINTMENT_FIELDS: "appointment/get_appointments_fields",
  CREATE_NEW_APPOINTMENT: "appointment/create_new_appointment",
  READ_APPOINTMENT: "appointment/read_appointments",
  EDIT_APPOINTMENT: "appointment/edit_appointment",
  EDIT_APPOINTMENT_STATUS: "appointment/edit_appointment_status",
  SET_LOADING: "appointments/set_loading",
  SET_EDIT_LOADING_1: "appointments/set_edit_loading_1",
  SET_EDIT_LOADING_2: "appointments/set_edit_loading_2",
};

interface SetTodaysAppointments {
  type: typeof ACTIONS.SET_TODAY_APPOINTMENTS;
  payload: Object;
}
interface GetAppointmentFields {
  type: typeof ACTIONS.GET_APPOINTMENT_FIELDS;
  payload: Object;
}
interface CreateNewAppointment {
  type: typeof ACTIONS.CREATE_NEW_APPOINTMENT;
  payload: Object;
}
interface ReadAppointments {
  type: typeof ACTIONS.READ_APPOINTMENT;
  payload: Object;
}
interface EditAppointment {
  type: typeof ACTIONS.EDIT_APPOINTMENT;
  payload: Object;
}
interface EditAppointmentStatus {
  type: typeof ACTIONS.EDIT_APPOINTMENT_STATUS;
  payload: Object;
}
interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}
interface SetEditLoadng1 {
  type: typeof ACTIONS.SET_EDIT_LOADING_1;
  payload: boolean;
}
interface SetEditLoadng2 {
  type: typeof ACTIONS.SET_EDIT_LOADING_2;
  payload: boolean;
}

export type AppointmentTypes =
  | SetTodaysAppointments
  | SetLoadng
  | SetEditLoadng1
  | SetEditLoadng2
  | GetAppointmentFields
  | CreateNewAppointment
  | ReadAppointments
  | EditAppointment
  | EditAppointmentStatus;
