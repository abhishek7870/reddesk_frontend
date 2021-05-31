import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import TransformIcon from "@material-ui/icons/Transform";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

function CallTransfer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="call-options-list-down">
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ color: "#fff" }}>
          <TransformIcon />
        </ListItemIcon>
        <ListItemText primary="Call Transfer" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/dashboard/admin/call-transfer">
            <ListItem button className={classes.nested}>
              <ListItemText primary="By Comma" className="list-item-text" />
            </ListItem>
          </Link>
          <Link to="/dashboard/admin/call-transfer/by-city">
            <ListItem button className={classes.nested}>
              <ListItemText primary="By City" className="list-item-text" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </div>
  );
}

export default CallTransfer;
