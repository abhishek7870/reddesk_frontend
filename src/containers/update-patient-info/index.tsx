import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import UpdatePatientInfoMain from "../../newcomponents/update-patient-info-main";

function UpdatePatientInfo() {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <UpdatePatientInfoMain />
    </div>
  );
}

export default UpdatePatientInfo;
