import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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

const UploadCSV: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="call-options-list-down">
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ color: "#fff" }}>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload CSV Data" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/dashboard/admin/upload/fb">
            <ListItem button className={classes.nested}>
              <ListItemText primary="FB Data" className="list-item-text" />
            </ListItem>
          </Link>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Lead Data" className="list-item-text" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Crysta Data" className="list-item-text" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default UploadCSV;
