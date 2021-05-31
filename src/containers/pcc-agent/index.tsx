import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import PccDashboardRight from "../../newcomponents/panels/pcc-panel/dashboard-right";

interface Props {
  children: any;
}
const PccAgentDash: React.FC<Props> = ({ children }) => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <PccDashboardRight>{children && children}</PccDashboardRight>
    </div>
  );
};

export default PccAgentDash;
