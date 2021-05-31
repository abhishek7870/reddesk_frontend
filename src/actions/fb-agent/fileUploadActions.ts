import { ACTIONS } from "../../interfaces/actionTypes/fbActionTypes/fileUploadTypes";
import { AXIOS_FILE } from "../../config/Axios";
import Prefix from "../../config/ApiPrefix";
import snackBarUpdate from "../../actions/snackBarActions";
import SecureStorage from "../../config/SecureStorage";

export const fbFileUpload = (file: File) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await AXIOS_FILE.post(
      `${Prefix.api}/upload/fbuser/`,
      formData,
      { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.UPLOAD_FILE, payload: data });
    snackBarUpdate({
      payload: {
        message: "Success!",
        status: true,
        type: "success",
      },
    })(dispatch);
  } catch (err) {
    let title = "";
    if (err.response) {
      title = err.response.data.error;
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
