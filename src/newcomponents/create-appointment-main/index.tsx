import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {
  getAppointmentsFields,
  createNewAppointment,
} from "../../actions/appointmentActions";
import { isEmpty } from "../../helpers/isEmpty";
import { Validation } from "../../helpers/noValidator";
import { fixCommentFilter, doctorFilter } from "../../helpers/fixComment";
import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  getAppointmentsFields: Function;
  createNewAppointment: Function;
  patient_data: any;
  create_appnt_field_data: any;
  loading: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateAppointmentMain: React.FC<Props> = ({
  getAppointmentsFields,
  createNewAppointment,
  patient_data,
  create_appnt_field_data,
  loading,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let query = useQuery();

  const [clinic, setClinic] = React.useState<string>("");
  const [doctor, setDoctor] = React.useState<string>("");
  const [treatment, setTreatment] = React.useState(0);
  const [appt_Date, setApptDate] = React.useState<string>("");
  const [appt_time, setApptTime] = React.useState<string>("");
  const [followup_date, setFollowupDate] = React.useState<string>("");
  const [followup_time, setFollowupTime] = React.useState<string>("");
  const [pcc, setPcc] = React.useState<string>("");
  const [pvac, setPvac] = React.useState<string>("");
  const [comment_type, setCommentType] = React.useState<number>(1);
  const [add_comment, setAddComment] = React.useState<string>("");
  const [fix_comment, setFixComment] = React.useState<string>("");
  const [package_amt, setPackage] = React.useState<number>(0);
  // const [fix_comment, setFixComment] = React.useState<string>("");

  useEffect(() => {
    if (query.get("id")) {
      let body = {
        lead: query.get("id"),
      };
      getAppointmentsFields(body);
    } else {
      if (isEmpty(patient_data)) {
        history.push("/dashboard/ce");
      } else {
        let body = {
          lead: patient_data.results[0].id,
        };
        getAppointmentsFields(body);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClinicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClinic(event.target.value as string);
  };
  const handleDoctorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDoctor(event.target.value as string);
  };
  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as number);
  };
  const handleAppointmentDate = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setApptDate(event.target.value as string);
  };
  const handleAppointmentTime = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setApptTime(event.target.value as string);
  };
  const handleFollowupDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFollowupDate(event.target.value as string);
  };
  const handleFollowupTime = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFollowupTime(event.target.value as string);
  };
  const handlePccChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPcc(event.target.value as string);
  };
  const handlePvacChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPvac(event.target.value as string);
  };
  const handleCommentTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCommentType(event.target.value as number);
  };
  const handleFixCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFixComment(event.target.value as string);
  };

  const submitForm = async () => {
    let body = {
      lead: query.get("id") ? query.get("id") : patient_data.results[0].id,
      appointment_date: appt_Date,
      appointment_time: appt_time,
      center: clinic,
      doctor,
      treatment,
      follow_up_date: followup_date,
      follow_up_time: followup_time,
      comment_type,
      fix_comment,
      comment: add_comment,
      pcc,
      pvac,
      package_amt,
    };
    console.log(body);
    await createNewAppointment(body);
    history.push("/dashboard");
  };

  return (
    <div className="main-right">
      <div className="call-options"></div>

      <div className="create-appointment">
        <Card className={classes.root}>
          <CardContent>
            <div className="header-collapse">Appointment Creation</div>
            <form className="form-fields info">
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Suggested Centers</p>
                  <TextareaAutosize
                    disabled
                    value={
                      !isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.suggested_center.length > 0
                        ? create_appnt_field_data.suggested_center.map(
                            (center: any) => center.center
                          )
                        : ""
                    }
                    rowsMin={3}
                    rowsMax={3}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    placeholder="Crysta IVF"
                  />
                </div>
                <div>
                  <p>Fertility Center</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={clinic}
                      onChange={handleClinicChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {!isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.centers.length > 0
                        ? create_appnt_field_data.centers.map((center: any) => (
                            <MenuItem value={center.id}>{center.name}</MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p>Doctor</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={doctor}
                      onChange={handleDoctorChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {!isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.doctor.length > 0 &&
                      doctorFilter(clinic, create_appnt_field_data.doctor)
                        .length > 0
                        ? doctorFilter(
                            clinic,
                            create_appnt_field_data.doctor
                          ).map((item: any) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))
                        : "NA"}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Appointment Date</p>
                  <TextField
                    id="date"
                    type="date"
                    value={appt_Date}
                    onChange={handleAppointmentDate}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <p>Appointment Time</p>
                  <TextField
                    id="time"
                    type="time"
                    value={appt_time}
                    onChange={handleAppointmentTime}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <p>Treatment</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={treatment}
                      onChange={handleTreatmentChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem>None</MenuItem>
                      <MenuItem value={3}>SURROGACY</MenuItem>
                      <MenuItem value={2}>IVF</MenuItem>
                      <MenuItem value={1}>IUI</MenuItem>
                      <MenuItem value={4}>HISTRO/LAPROSCOPY</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Follow up Date</p>
                  <TextField
                    id="date"
                    type="date"
                    value={followup_date}
                    onChange={handleFollowupDate}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <p>Follow up Time</p>
                  <TextField
                    id="time"
                    type="time"
                    value={followup_time}
                    onChange={handleFollowupTime}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <p>PCC</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={pcc}
                      onChange={handlePccChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {!isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.pcc.length > 0
                        ? create_appnt_field_data.pcc.map((doc: any) => (
                            <MenuItem value={doc.id}>{doc.user}</MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>PVAC</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={pvac}
                      onChange={handlePvacChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"single"}>Single</MenuItem>
                      <MenuItem value={"couple"}>Couple</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p>Comment Type</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={comment_type === 0 ? "" : comment_type}
                      onChange={handleCommentTypeChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {!isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.commentType.length > 0
                        ? create_appnt_field_data.commentType.map(
                            (doc: any) => (
                              <MenuItem value={doc.id}>{doc.name}</MenuItem>
                            )
                          )
                        : null}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p>Fix Comment</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={fix_comment}
                      onChange={handleFixCommentChange}
                      style={{ width: "90%", maxWidth: "440.89px" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {!isEmpty(create_appnt_field_data) &&
                      create_appnt_field_data.commentFix.length > 0 &&
                      fixCommentFilter(
                        comment_type,
                        create_appnt_field_data.commentFix
                      ).length > 0
                        ? fixCommentFilter(
                            comment_type,
                            create_appnt_field_data.commentFix
                          ).map((item: any) => (
                            <MenuItem value={item.id}>
                              {item.fix_comment}
                            </MenuItem>
                          ))
                        : "NA"}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Package Ammount</p>
                  <input
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    type="text"
                    className="other-text"
                    value={package_amt}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      if (Validation(e.target.value)) {
                        setPackage(e.target.value as number);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Add Comment</p>
                  <TextareaAutosize
                    rowsMin={3}
                    style={{ width: "95%" }}
                    placeholder="Write a comment"
                    value={add_comment}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setAddComment(event.target.value as string);
                    }}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardActions style={{ paddingLeft: "16px" }}>
            <Button
              style={{
                background: "#924A91",
                color: "#fff",
                paddingTop: "0",
                paddingBottom: "0",
                width: "100%",
              }}
              size="large"
              disabled={loading}
              onClick={submitForm}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
  create_appnt_field_data: state.appointmentsReducer.create_appnt_field_data,
  loading: state.appointmentsReducer.loading,
});

export default connect(mapStateToProps, {
  getAppointmentsFields,
  createNewAppointment,
})(CreateAppointmentMain);
