import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import EditCallDetailsMain from "../../newcomponents/edit-call-details-main";

const EditCallDetails: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <EditCallDetailsMain />
    </div>
  );
};

export default EditCallDetails;
