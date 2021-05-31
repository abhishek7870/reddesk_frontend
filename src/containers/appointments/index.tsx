import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import AppointmentsMain from "../../newcomponents/appointments";

const Appointments: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <AppointmentsMain />
    </div>
  );
};

export default Appointments;
