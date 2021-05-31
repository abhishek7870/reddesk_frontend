import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import { connect } from "react-redux";
import { setOtherInfo } from "../../../../actions/patientInfoActions";
import { getCenterList } from "../../../../actions/dropdownActions";
import { isEmpty } from "../../../../helpers/isEmpty";
const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    // margin: theme.spacing(1),
    // marginLeft: 0,
    minWidth: 120,
  },
});

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

function getStyles(name: string, cityName: string[], theme: Theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  setOtherInfo: Function;
  id: number;
  getCenterList: Function;
  center_list: any;
  loading: boolean;
  loading_form_4: boolean;
  data: any;
}

const OtherDetails: React.FC<Props> = ({
  setOtherInfo,
  id,
  getCenterList,
  center_list,
  loading,
  loading_form_4,
  data,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [priority, setPriority] = React.useState<string>("");
  const [patient_aviability_day, setAvailabilityDay] = React.useState<string>(
    ""
  );
  const [tentative_appt_Date, setTentativeDate] = React.useState<string>("");
  const [tentative_appt_time, setTentativeTime] = React.useState<string>("");
  const [patient_aviability_time, setAvailabilityTime] = React.useState<string>(
    ""
  );
  const [followup_date, setFollowUpDate] = React.useState<string>("");
  const [followup_time, setFollowUpTime] = React.useState<string>("");
  const [centerName, setCenterName] = React.useState<string[]>([]);

  const handlePriorityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPriority(event.target.value as string);
  };
  const handleAvailabilityDayChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAvailabilityDay(event.target.value as string);
  };
  const handleTentaiveDateChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTentativeDate(event.target.value as string);
  };
  const handleFollowUpDateChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFollowUpDate(event.target.value as string);
  };
  const handleFollowUpTimeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFollowUpTime(event.target.value as string);
  };
  const handleTentaiveTimeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTentativeTime(event.target.value as string);
  };
  const handleAvailabilityTimeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAvailabilityTime(event.target.value as string);
  };
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCenterName(event.target.value as string[]);
  };

  useEffect(() => {
    getCenterList();
    setAvailabilityDay(data.patient_aviability_day);
    setAvailabilityTime(data.patient_aviability_time);
    setTentativeDate(data.tentative_appt_Date);
    setTentativeTime(data.tentative_appt_time);
    setFollowUpDate(data.followup_date);
    setFollowUpTime(data.followup_time);
    setPriority(data.priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const submitForm = async () => {
    let body = {
      patient_aviability_day,
      patient_aviability_time,
      tentative_appt_Date,
      tentative_appt_time,
      priority,
      followup_date,
      followup_time,
    };

    await setOtherInfo(body, id);
    setToggleForm(false);
    history.push("/dashboard");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Other Details{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Patient Aviability Day</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={patient_aviability_day}
                  onChange={handleAvailabilityDayChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Sunday"}>Sunday</MenuItem>
                  <MenuItem value={"Monday"}>Monday</MenuItem>
                  <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                  <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                  <MenuItem value={"Thursday"}>Thursday</MenuItem>
                  <MenuItem value={"Friday"}>Friday</MenuItem>
                  <MenuItem value={"Saturday"}>Saturday</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <p>Patient Aviability Time</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={patient_aviability_time}
                  onChange={handleAvailabilityTimeChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"morning"}>Morning</MenuItem>
                  <MenuItem value={"noon"}>Noon</MenuItem>
                  <MenuItem value={"evening"}>Evening</MenuItem>
                  <MenuItem value={"night"}>Night</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Tentative Appt Date</p>
              <TextField
                id="date"
                type="date"
                value={tentative_appt_Date}
                onChange={handleTentaiveDateChange}
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <p>Tentative Appt Time</p>
              <TextField
                id="time"
                type="time"
                value={tentative_appt_time}
                onChange={handleTentaiveTimeChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  "aria-label": "Without label",
                  step: 300, // 5 min
                }}
              />
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Followup Date</p>
              <TextField
                id="date"
                type="date"
                value={followup_date}
                onChange={handleFollowUpDateChange}
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <p>Followup Time</p>
              <TextField
                id="time"
                type="time"
                value={followup_time}
                onChange={handleFollowUpTimeChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  "aria-label": "Without label",
                  step: 300, // 5 min
                }}
              />
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Priority</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={priority}
                  onChange={handlePriorityChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Urgent"}>Urgent</MenuItem>
                  <MenuItem value={"Critical"}>Critical</MenuItem>
                  <MenuItem value={"Hopefull"}>Hopefull</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <p>Suggested centers</p>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={centerName}
                  onChange={handleSelectChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={undefined}
                  MenuProps={MenuProps}
                >
                  {loading
                    ? "Loading"
                    : !isEmpty(center_list) && center_list.count > 0
                    ? center_list.results.map((center: any) => (
                        <MenuItem
                          key={center.id}
                          value={center.id}
                          style={getStyles(center.name, centerName, theme)}
                        >
                          {center.name}
                        </MenuItem>
                      ))
                    : "No results"}
                </Select>
              </FormControl>
            </div>
          </div>
        </form>
      </CardContent>
      <CardActions
        style={{ paddingLeft: "16px", display: !toggleForm ? "none" : "block" }}
      >
        <Button
          style={{
            background: "#924A91",
            color: "#fff",
            paddingTop: "0",
            paddingBottom: "0",
            width: "100%",
          }}
          size="large"
          onClick={submitForm}
          disabled={loading_form_4}
        >
          <p>
            {loading_form_4 ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              "Submit"
            )}
          </p>
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  center_list: state.dropdownReducer.center_list,
  loading: state.dropdownReducer.loading,
  loading_form_4: state.patientInfoReducer.loading_form_4,
});

export default connect(mapStateToProps, { setOtherInfo, getCenterList })(
  OtherDetails
);
