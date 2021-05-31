import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

const RejectCalls: React.FC = () => {
  return (
    <div className="call-options-list-down">
      <Link to="/dashboard/admin/reject-calls">
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <NotInterestedIcon />
          </ListItemIcon>
          <ListItemText primary="Reject Calls" />
        </ListItem>
      </Link>
    </div>
  );
};

export default RejectCalls;
