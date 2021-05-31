import {
  ACTIONS,
  FileUploadTypes,
} from "../../interfaces/actionTypes/fbActionTypes/fileUploadTypes";

type InitialState = {
  data: object;
  loading: boolean;
};

const initialState: InitialState = {
  data: {},
  loading: false,
};

const filterReducer = (state = initialState, action: FileUploadTypes) => {
  switch (action.type) {
    case ACTIONS.UPLOAD_FILE:
      return {
        ...state,
        data: action.payload,
        loading: false,
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

export default filterReducer;
