import axios from "axios";
import securestorage from "./SecureStorage";
const AXIOS = axios.create({
  baseURL: `${process.env.REACT_APP_API_PATH}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${securestorage.getItem("token")}`,
  },
  timeout: 20000,
});

export const AXIOS_FILE = axios.create({
  baseURL: `${process.env.REACT_APP_API_PATH}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${securestorage.getItem("token")}`,
  },
  timeout: 20000,
});

export default AXIOS;
