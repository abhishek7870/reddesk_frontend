import { ACTIONS, CommentTypes } from "../interfaces/actionTypes/commentTypes";

type CommentsInitialState = {
  data: object;
  loading: boolean;
  redirect: boolean;
  lead_source: object;
};

const initialState: CommentsInitialState = {
  data: {},
  loading: false,
  redirect: false,
  lead_source: {},
};

const commentsReducer = (state = initialState, action: CommentTypes) => {
  switch (action.type) {
    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ACTIONS.SET_AGREE_FOR_APPOINTMENT:
      return {
        ...state,
        loading: false,
        redirect: true,
      };
    case ACTIONS.GET_LEAD_SOURCE:
      return {
        ...state,
        lead_source: action.payload,
        loading: false,
      };
    case ACTIONS.CREATE_CALL:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.ADD_ALT_NO:
      return {
        ...state,
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

export default commentsReducer;
