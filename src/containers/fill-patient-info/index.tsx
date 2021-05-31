import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import FillPatientInfoMain from "../../newcomponents/fill-patient-info";

const FillPatientInfo: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <FillPatientInfoMain />
    </div>
  );
};

export default FillPatientInfo;
