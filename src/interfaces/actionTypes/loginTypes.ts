export const ACTIONS = {
  SET_USER: "login/set_user",
  SET_PROFILE: "login/set_profile",
  LOGOUT: "login/logout",
  SET_LOADING: "login/set_loading",
};

interface SetUser {
  type: typeof ACTIONS.SET_USER;
  payload: Array<string | number>;
}
interface SetProfile {
  type: typeof ACTIONS.SET_PROFILE;
  payload: object;
}
interface Logout {
  type: typeof ACTIONS.LOGOUT;
  payload: any;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type LoginActionTypes = SetUser | Logout | SetLoadng | SetProfile;
