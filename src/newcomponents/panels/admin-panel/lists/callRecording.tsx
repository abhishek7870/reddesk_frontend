import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";

const CallRecordings: React.FC = () => {
  return (
    <div className="call-options-list-down">
      <Link to="/dashboard/admin/call-recordings">
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <SettingsVoiceIcon />
          </ListItemIcon>
          <ListItemText primary="Call Recordings" />
        </ListItem>
      </Link>
    </div>
  );
};

export default CallRecordings;
