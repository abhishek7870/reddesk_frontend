import React from "react";
import CallDetails from "../call-details";
import PatientBasicInfo from "../patient-basic-info";
import SearchBar from "../search-bar";
import CallOptions from "./call-options";
import "./index.sass";

const AgentDashboardRight: React.FC = () => {
  return (
    <div className="main-right">
      <CallOptions />
      <SearchBar />
      <div className="main-patient-info">
        <PatientBasicInfo />
        <CallDetails />
      </div>
    </div>
  );
};

export default AgentDashboardRight;
