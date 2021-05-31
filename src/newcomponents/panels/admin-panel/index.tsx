import React from "react";
import "./index.sass";
import AppointmentFeedback from "./lists/AppointmentFeedback";
import Appointments from "./lists/Appointments";
import CallList from "./lists/CallList";
import CallRecordings from "./lists/callRecording";
import CallTransfer from "./lists/CallTransfer";
import OperatorTransfer from "./lists/operatorTransfer";
import PatientSupport from "./lists/PatientSupport";
import PositiveCallList from "./lists/PositiveCallList";
import RejectCalls from "./lists/rejectCalls";
import UploadCSV from "./lists/UploadCSV";

const AdminPanel: React.FC = () => {
  return (
    <>
      <CallList />
      <PositiveCallList />
      <Appointments />
      <AppointmentFeedback />
      <CallTransfer />
      <PatientSupport />
      <UploadCSV />
      <RejectCalls />
      <OperatorTransfer />
      <CallRecordings />
    </>
  );
};

export default AdminPanel;
