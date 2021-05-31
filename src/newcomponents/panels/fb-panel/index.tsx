import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./index.sass";

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

const FBPanel: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="upload-options">
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ color: "#fff" }}>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload CSV" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="FB Data" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Center Data" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Crysta Data" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default FBPanel;
