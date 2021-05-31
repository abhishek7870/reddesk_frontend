export const ACTIONS = {
  UPLOAD_FILE: "fb_agent/upload_file",
  SET_LOADING: "fb_agent/set_loading",
};

interface UploadFile {
  type: typeof ACTIONS.UPLOAD_FILE;
  payload: Object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

export type FileUploadTypes = UploadFile | SetLoadng;
