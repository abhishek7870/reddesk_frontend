import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ScheduleIcon from "@material-ui/icons/Schedule";

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

function Appointments() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="call-options-list-down">
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ color: "#fff" }}>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/dashboard/pcc/appointments?day=today">
            <ListItem button className={classes.nested}>
              <ListItemText primary="Today" className="list-item-text" />
            </ListItem>
          </Link>
          <Link to="/dashboard/pcc/appointments?day=tomorrow">
            <ListItem button className={classes.nested}>
              <ListItemText primary="Tomorrow" className="list-item-text" />
            </ListItem>
          </Link>
          <Link to="/dashboard/pcc/appointments?day=all">
            <ListItem button className={classes.nested}>
              <ListItemText primary="All" className="list-item-text" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </div>
  );
}

export default Appointments;
