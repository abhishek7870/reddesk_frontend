import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

const OperatorTransfer: React.FC = () => {
  return (
    <div className="call-options-list-down">
      <Link to="/dashboard/admin/operator-transfer">
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <PhoneAndroidIcon />
          </ListItemIcon>
          <ListItemText primary="Operator Transfer" />
        </ListItem>
      </Link>
    </div>
  );
};

export default OperatorTransfer;
