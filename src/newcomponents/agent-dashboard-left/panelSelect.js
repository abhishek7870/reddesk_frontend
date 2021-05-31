import React from "react";
import { connect } from "react-redux";
import AdminPanel from "../panels/admin-panel";
import CEPanel from "../panels/ce-panel";
import FBPanel from "../panels/fb-panel";
import PccPanel from "../panels/pcc-panel";

function PanelSelect({ user }) {
  switch (user.user.user_group) {
    case "CustomerExecutive":
      return <CEPanel />;
    case "FBUser":
      return <FBPanel />;
    case "ADMIN":
      return <AdminPanel />;
    case "PCC":
      return <PccPanel />;
    default:
      return null;
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
});

export default connect(mapStateToProps)(PanelSelect);
