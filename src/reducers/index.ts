import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import patientInfoReducer from "./patientInfoReducer";
import dashboardReducer from "./dashboardReducer";
import appointmentsReducer from "./appointmentsReducer";
import positiveCallsReducer from "./positiveCallsReducer";
import commentsReducer from "./commentsReducer";
import dropdownReducer from "./dropdownReducer";
import snackBarReducer from "./snackBarReducer";
import filterReducer from "./filterReducer";
import fileUploadReducer from "./fb-agent-reducers/fileUploadReducer";
import leadTransferReducer from "./admin-reducers/leadTransfer";
import AdminTableReducer from "./admin-reducers/tableReducer";
import AdminFilterReducer from "./admin-reducers/filterReducer";
const rootReducer = combineReducers({
  patientInfoReducer,
  loginReducer,
  dashboardReducer,
  appointmentsReducer,
  positiveCallsReducer,
  commentsReducer,
  dropdownReducer,
  snackBarReducer,
  filterReducer,
  fileUploadReducer,
  leadTransferReducer,
  AdminTableReducer,
  AdminFilterReducer,
});

export default rootReducer;
