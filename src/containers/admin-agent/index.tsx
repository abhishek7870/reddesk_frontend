import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import AdminDashboardRight from "../../newcomponents/panels/admin-panel/dashboard-right";

interface Props {
  children: any;
}
const AdminAgentDash: React.FC<Props> = ({ children }) => {
  return (
    <div className="main">
      <AgentDashboardLeft />

      <AdminDashboardRight>{children && children}</AdminDashboardRight>
    </div>
  );
};

export default AdminAgentDash;
