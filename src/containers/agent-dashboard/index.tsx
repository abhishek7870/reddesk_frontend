import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import AgentDashboardRight from "../../newcomponents/agent-dashboard-right";

import "./index.sass";

const Agent: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <AgentDashboardRight />
    </div>
  );
};

export default Agent;
