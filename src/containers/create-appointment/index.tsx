import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import CreateAppointmentMain from "../../newcomponents/create-appointment-main";

const CreateAppointment: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <CreateAppointmentMain />
    </div>
  );
};

export default CreateAppointment;
