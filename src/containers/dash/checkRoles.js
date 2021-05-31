import React from "react";
import { Redirect } from "react-router-dom";

function checkRoles({ role }) {
  switch (role) {
    case "CustomerExecutive":
      return <Redirect to="/dashboard/ce" />;
    case "FBUser":
      return <Redirect to="/dashboard/ad" />;
    case "ADMIN":
      return <Redirect to="/dashboard/admin" />;
    case "PCC":
       return <Redirect to="/dashboard/pcc" />
    default:
      return null;
  }
}

export default checkRoles;
