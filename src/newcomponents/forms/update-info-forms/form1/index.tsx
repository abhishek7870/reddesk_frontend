import React, { useState } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import "./index.sass";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    margin: "15px 0",
    // background: "#F7F7F7",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    // marginLeft: 0,
    minWidth: 120,
  },
  textField: {
    // marginLeft: theme.spacing(1),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    // margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const centers = [
  "CRYSTA IVF - Adarsh Nagar - Adarsh Nagar",
  "CRYSTA IVF - Kanpur - Kakadeo",
  "CRYSTA IVF - Narayan Peth Pune - Narayan Peth",
  "CRYSTA IVF - Rajouri Garden - Rajouri Garden",
  "CRYSTA IVF - Baner Pune - Baner Pune",
  "CRYSTA IVF - Rajouri Garden - Rajouri Garden",
];

function getStyles(name: string, cityName: string[], theme: Theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Form1() {
  const classes = useStyles();
  const theme = useTheme();
  const [urgency, setUrgency] = useState("");
  const [commentType, setCommentType] = useState("");
  const [centerName, setCenterName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrgency(event.target.value as string);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCommentType(event.target.value as string);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCenterName(event.target.value as string[]);
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ height: "80%" }}>
        <form className="form-fields">
          <div className="form-elements">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Urgency
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={urgency}
                onChange={handleChange}
                label="Urgency"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Critical"}>Critical</MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Hopefull"}>Hopefull</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-elements">
            <TextField
              id="date"
              label="Next Call Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="form-elements">
            <TextField
              id="time"
              label="Next Call Time"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          <div className="form-elements">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">
                Recommended Centers
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={centerName}
                onChange={handleSelectChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {centers.map((center) => (
                  <MenuItem
                    key={center}
                    value={center}
                    style={getStyles(center, centerName, theme)}
                  >
                    {center}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-elements">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Comment Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={commentType}
                onChange={handleCommentChange}
                label="Urgency"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Lead Details Update"}>
                  Lead Details Update
                </MenuItem>
                <MenuItem value={"Call Later"}>Call Later</MenuItem>
                <MenuItem value={"Negative"}>Negative</MenuItem>
                <MenuItem value={"Not Responding"}>Not Responding</MenuItem>
                <MenuItem value={"Appointment Schedul"}>
                  Appointment Schedule
                </MenuItem>
                <MenuItem value={"Appointment Missed"}>
                  Appointment Missed
                </MenuItem>
                <MenuItem value={"Appointment Done"}>Appointment Done</MenuItem>
                <MenuItem value={"Appointment Convert"}>
                  Appointment Convert
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-elements">
            <TextField
              id="outlined-basic"
              label="Fix Comment"
              variant="outlined"
            />
          </div>
          <div className="form-elements">
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Add Comment"
              style={{ marginRight: "10px", width: "100%" }}
            />
          </div>

          <div className="button-grp">
            <Button variant="contained" color="secondary">
              Update Call
            </Button>
            <Button variant="contained" color="secondary">
              Book Appointment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default Form1;
