import React from "react";
import SearchBar from "../search-bar";

import "./index.sass";

interface Props {
  children: any;
}
const PccDashboardRight: React.FC<Props> = ({ children }) => {
  return (
    <div className="main-right">
      <div className="call-options"></div>
    
      <SearchBar />
      <div className="main-admin-info">{children && children}</div>
    </div>
  );
};

export default PccDashboardRight;
