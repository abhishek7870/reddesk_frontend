import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import EditAppointmentDetailsMain from "../../newcomponents/edit-appointment-details-main";

const EditAppointmentDetails: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <EditAppointmentDetailsMain />
    </div>
  );
};

export default EditAppointmentDetails;
