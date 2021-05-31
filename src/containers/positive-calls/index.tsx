import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import PositiveCallsMain from "../../newcomponents/positive-calls-main";

const PositiveCalls: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <PositiveCallsMain />
    </div>
  );
};

export default PositiveCalls;
