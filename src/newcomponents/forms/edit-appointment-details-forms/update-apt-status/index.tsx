import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { editAppointmentStatus } from "../../../../actions/appointmentActions";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  editAppointmentStatus: Function;
  loading: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UpdateStatusInfo: React.FC<Props> = ({
  editAppointmentStatus,
  loading,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let query = useQuery();

  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState<number>(1);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as number);
  };

  useEffect(() => {
    if (!query.get("id")) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async () => {
    let body = {
      apptId: query.get("id"),
      status,
    };
    await editAppointmentStatus(body);
    history.push("/dashboard");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Update Appointment Status{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info non-parted"
          style={{ display: !toggleForm ? "none" : "flex" }}
        >
          <div
            className="form-elements bottom"
            style={{ display: "flex", borderTop: "none" }}
          >
            <div>
              <p>Status</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value={1}>Appointment Scheduled</MenuItem>
                  <MenuItem value={2}>Appointment Missed</MenuItem>
                  <MenuItem value={3}>Appointment Done</MenuItem>
                  <MenuItem value={4}>Appointment Converted</MenuItem>
                </Select>
              </FormControl>
            </div>
            <button
              style={{ width: "20%" }}
              className="add-comment-btn"
              onClick={submitForm}
            >
              <p>
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Update Status"
                )}
              </p>
            </button>
          </div>
        </form>
      </CardContent>
      <CardActions
        style={{ paddingLeft: "16px", display: !toggleForm ? "none" : "block" }}
      ></CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.appointmentsReducer.edit_appointment_loading_2,
});

export default connect(mapStateToProps, { editAppointmentStatus })(
  UpdateStatusInfo
);
