import Auth from "../services/Auth";
import SecureStorage from "../config/SecureStorage";
import snackBarUpdate from "../actions/snackBarActions";
import { ACTIONS } from "../interfaces/actionTypes/loginTypes";

export const login = (body: object) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data, status } = await Auth.login({ user: body });
    let authResponse: any = [];
    if (status === 200 || status === 201) {
      authResponse = {
        data,
        status,
      };

      const user = data.user.username;
      const token = data.user.token;

      SecureStorage.setItem("token", token);
      dispatch({ type: ACTIONS.SET_USER, payload: user });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
    return authResponse;
  } catch (err) {
    let title = "";
    if (err.response) {
      const {
        status,
        data: {
          errors: { error },
        },
      } = err.response;
      if (status === 400) {
        title = error;
      }
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title,
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    throw err;
  }
};

export const logout = () => ({ type: ACTIONS.LOGOUT });

export const checkUser = () => async (dispatch: Function) => {
  try {
    const data = await Auth.checkLogin();
    let checkUserLoginResponse;

    if (Object.keys(data.user).length > 0) {
      checkUserLoginResponse = data;

      dispatch({ type: ACTIONS.SET_USER, payload: data });
    }
    return checkUserLoginResponse;
  } catch (error) {
    return error;
  }
};

export const setProfile = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await Auth.setProfile();
    dispatch({ type: ACTIONS.SET_PROFILE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
