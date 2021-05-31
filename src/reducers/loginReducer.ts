import {
  ACTIONS,
  LoginActionTypes,
} from "../interfaces/actionTypes/loginTypes";
import SecureStorage from "../config/SecureStorage";

type LoginInitialState = {
  user: object;
  profile: object;
  status: boolean;
  loading: boolean;
};

const initialState: LoginInitialState = {
  user: {
    username: "",
    email: "",
    age: 0,
  },
  status: false,
  profile: {},
  loading: false,
};

const userReducer = (state = initialState, action: LoginActionTypes) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: true,
      };
    case ACTIONS.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case ACTIONS.LOGOUT:
      SecureStorage.removeItem("token");
      window.location.href = "/";
      return {
        ...state,
        ...initialState,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
