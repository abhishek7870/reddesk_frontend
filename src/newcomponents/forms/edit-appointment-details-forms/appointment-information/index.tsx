import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { isEmpty } from "../../../../helpers/isEmpty";
import { fixCommentFilter } from "../../../../helpers/fixComment";
import { editAppointment } from "../../../../actions/appointmentActions";
import { editAppointmentStatus } from "../../../../actions/appointmentActions";

import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  read_appointment_data: any;
  patient_data: any;
  loading: boolean;
  editAppointment: Function;
  editAppointmentStatus: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AppointmentInformation: React.FC<Props> = ({
  read_appointment_data,
  editAppointment,
  editAppointmentStatus,
  patient_data,
  loading,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let query = useQuery();

  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [comment_type, setCommentType] = React.useState<number>(
    !isEmpty(read_appointment_data)
      ? read_appointment_data.commentType[0].id
      : 0
  );
  const [fix_comment, setFixComment] = React.useState<number>(0);
  const [add_comment, setAddComment] = React.useState<string>("");
  const [status, setStatus] = React.useState<number>(
    !isEmpty(read_appointment_data)
      ? read_appointment_data.appointment.appt_status
      : 0
  );

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as number);
  };

  const handleCommentTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCommentType(event.target.value as number);
  };
  const handleCommentFixChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFixComment(event.target.value as number);
  };
  const handleAddCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAddComment(event.target.value as string);
  };

  // useEffect(() => {
  //   if (isEmpty(patient_data)) {
  //     history.push("/dashboard/ce");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const submitForm = async () => {
    let body = {
      comment_type,
      fix_comment,
      add_comment,
      lead: read_appointment_data.lead.id,
    };
    let body2 = {
      apptId: query.get("id"),
      status,
      lead_id: read_appointment_data.lead.id,
    };
    await editAppointment(body);
    await editAppointmentStatus(body2);
    history.push("/dashboard");
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Appointment Information{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info non-parted"
          style={{ display: !toggleForm ? "none" : "flex" }}
        >
          <div className="part-left">
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Appt Id:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.id
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Center:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.center
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Doctor:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.doctor
                    : "NA"}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Appt Date:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.appt_date
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Time:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.appt_time
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Treatment:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.treatment
                    : "NA"}
                </span>
              </div>
            </div>

            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>PCC:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.appointment)
                    ? read_appointment_data.appointment.pcc
                    : "NA"}
                </span>
              </div>
            </div>
          </div>
          <div className="form-elements bottom" style={{ display: "flex" }}>
            <div>
              <p>Comment Type</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={comment_type}
                  onChange={handleCommentTypeChange}
                >
                  {!isEmpty(read_appointment_data) &&
                  read_appointment_data.commentType.length > 0
                    ? read_appointment_data.commentType.map((item: any) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
            <div>
              <p>Fix Comment</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={fix_comment}
                  onChange={handleCommentFixChange}
                >
                  {!isEmpty(read_appointment_data) &&
                  read_appointment_data.commentFix.length > 0 &&
                  fixCommentFilter(
                    comment_type,
                    read_appointment_data.commentFix
                  ).length > 0
                    ? fixCommentFilter(
                        comment_type,
                        read_appointment_data.commentFix
                      ).map((item: any) => (
                        <MenuItem value={item.id}>{item.fix_comment}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Add Comment.."
              style={{ width: "80%", marginRight: "10px" }}
              value={add_comment}
              onChange={handleAddCommentChange}
            />
          </div>
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
                  "Submit"
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
  read_appointment_data: state.appointmentsReducer.read_appointment_data,
  loading: state.appointmentsReducer.edit_appointment_loading_1,
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps, {
  editAppointment,
  editAppointmentStatus,
})(AppointmentInformation);
