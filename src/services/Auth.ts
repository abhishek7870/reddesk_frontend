import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix";
import decode from "jwt-decode";
import SecureStorage from "../config/SecureStorage";

const Auth = {
  login(data: object) {
    return AXIOS.post(`${Prefix.api}/auth/users/login/`, {
      ...data,
    });
  },

  setProfile() {
    return AXIOS.get(`${Prefix.api}/auth/profile/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
  },

  checkLogin() {
    const token = SecureStorage.getItem("token");
    if (token) {
      const decoded: any = decode(token);

      if (!!token && !this.isTokenExpired(decoded)) {
        const { is_staff, user_group, uuid } = decoded;
        return { user: { is_staff, user_group, uuid } };
      } else {
        return { user: {} };
      }
    } else {
      return { user: {} };
    }
  },

  isTokenExpired(decoded: any) {
    try {
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        SecureStorage.removeItem("token");
        return true;
      } else return false;
    } catch (err) {
      console.log("expired check failed!");
      return false;
    }
  },
};

export default Auth;
