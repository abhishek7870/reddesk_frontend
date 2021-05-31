import { ACTIONS } from "../interfaces/actionTypes/dropdownTypes";
import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import SecureStorage from "../config/SecureStorage";

export const getCenterList = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(`${Prefix.api}/center/centers/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.GET_CENTER_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentFilterData = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(`${Prefix.api}/appointment/filter-data/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.GET_APPOINTMENT_FILTER_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCallsFilterData = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(`${Prefix.api}/lead/filter-data/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.GET_CALLS_FILTER_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCitiesDropdown = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const { data } = await AXIOS.get(`${Prefix.api}/core/cities/?limit=5000`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
    dispatch({ type: ACTIONS.GET_CITIES_DROPDOWN, payload: data });
  } catch (error) {
    console.log(error);
  }
};
