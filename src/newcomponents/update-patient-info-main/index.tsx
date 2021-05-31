import React from "react";
import Form1 from "../forms/update-info-forms/form1";
import "./index.sass";

function UpdatePatientInfoMain() {
  return (
    <div className="main-right">
      <div className="call-options"></div>
      <div className="main-info-forms">
        <Form1 />
      </div>
    </div>
  );
}

export default UpdatePatientInfoMain;
