import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import FBDashboardRight from "../../newcomponents/panels/fb-panel/dashboard-right";

function FbAgentDash() {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <FBDashboardRight />
    </div>
  );
}

export default FbAgentDash;
