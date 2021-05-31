import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getCenterList } from "../../../actions/dropdownActions";
import { setComments } from "../../../actions/commentActions";
import { setOtherInfo } from "../../../actions/patientInfoActions";
import { isEmpty } from "../../../helpers/isEmpty";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: "50%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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

function getStyles(name: string, cityName: string[], theme: Theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  getCenterList: Function;
  setComments: Function;
  setOtherInfo: Function;
  center_list: any;
  loading: boolean;
  loadingForm: boolean;
  patient_data: any;
  setOpen: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Callback: React.FC<Props> = ({
  getCenterList,
  setComments,
  setOtherInfo,
  center_list,
  loading,
  loadingForm,
  patient_data,
  setOpen,
}) => {
  const classes = useStyles();
  let query = useQuery();
  const theme = useTheme();
  let history = useHistory();
  const [priority, setPriority] = useState("none");
  const [comments, setCommentsText] = useState("none");
  const [other_comments, setOtherComments] = useState("");
  const [centerName, setCenterName] = React.useState<string[]>([]);
  const [followup_date, setFollowUpDate] = React.useState<string>("");
  const [followup_time, setFollowUpTime] = React.useState<string>("");

  const handlePriorityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPriority(event.target.value as string);
  };
  const handleCommentsChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCommentsText(event.target.value as string);
  };
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCenterName(event.target.value as string[]);
  };
  const handleOtherCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherComments(event.target.value as string);
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

  useEffect(() => {
    getCenterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async () => {
    let lead_comment = query.get("id")
      ? query.get("id")
      : patient_data.results[0].id;
    let body = {
      category: 3,
      sub_category: comments,
      lead_comment,
      comment: other_comments,
    };
    let body2 = {
      followup_date,
      followup_time,
      priority,
      suggested_center: centerName,
    };
    await setComments(body);
    await setOtherInfo(body2, lead_comment);
    // setTimeout(() => setOpen(false), 300);
    setOpen(false);
    history.push("/dashboard");
  };

  return (
    <form className="modal-form" noValidate>
      <div className="modal-form-fields">
        <TextField
          id="date"
          label="Date"
          type="date"
          value={followup_date}
          onChange={handleFollowUpDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          value={followup_time}
          onChange={handleFollowUpTimeChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </div>
      <div className="modal-form-fields">
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={priority}
            onChange={handlePriorityChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"none"}>Priority</MenuItem>
            <MenuItem value={"Urgent"}>Urgent</MenuItem>
            <MenuItem value={"Critical"}>Critical</MenuItem>
            <MenuItem value={"Hopefull"}>Hopefull</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
          </Select>
        </FormControl>
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
      <div className="modal-form-fields">
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={comments}
            onChange={handleCommentsChange}
          >
            <MenuItem value={"none"}>Comments</MenuItem>
            <MenuItem value={"call-after-lunch"}>Call After Lunch</MenuItem>
            <MenuItem value={"call-in-the evening"}>Call in evening</MenuItem>
            <MenuItem value={"call-tomorrow"}>Call tomorrow</MenuItem>
            <MenuItem value={"relative-picked"}>
              Relative picked and told patient not here
            </MenuItem>
            <MenuItem value={"out-of-the-city"}>Out of city</MenuItem>
            <MenuItem value={"busy"}>Busy right now</MenuItem>
            <MenuItem value={"want-sometime"}>Want sometime</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          placeholder="Other Comments"
          variant="outlined"
          value={other_comments}
          onChange={handleOtherCommentChange}
        />
      </div>
      <div className="modal-form-fields">
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={submitForm}
          disabled={loadingForm}
        >
          {loadingForm ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  center_list: state.dropdownReducer.center_list,
  loading: state.dropdownReducer.loading,
  loadingForm: state.commentsReducer.loading,
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps, {
  getCenterList,
  setComments,
  setOtherInfo,
})(Callback);
