import React from "react";
import AppointmentFeedback from "../pcc-panel/lists/AppointmentFeedback";
import Appointments from "./lists/Appointment";
import Conversion from '../pcc-panel/lists/conversion';
const PccPanel: React.FC = () => {
  return (
    <>
      
    
      <Appointments />
      <AppointmentFeedback />
      <Conversion />
      
    
      
    </>
  );
};

export default PccPanel;
