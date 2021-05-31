import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { medicalHistory } from "../../../../actions/patientInfoActions";
import { Validation } from "../../../../helpers/noValidator";

import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  medicalHistory: Function;
  id: number;
  loading_form_3: boolean;
  data: any;
}

const MedicalHistory: React.FC<Props> = ({
  medicalHistory,
  id,
  loading_form_3,
  data,
}) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [any_baby, setBabyStatus] = React.useState<string>("no");
  const [
    consulted_with_any_doctors,
    setConsultedStatus,
  ] = React.useState<string>("no");
  const [any_baby_process, setBabyType] = React.useState<string>("");
  const [
    consulted_with_any_doctors_name,
    setConsultDoctor,
  ] = React.useState<string>("");
  const [result, setResult] = React.useState<string | null>("");
  const [trying_to_conceive, setTryingToConcieve] = React.useState<number>(0);
  const [
    taken_any_fertility_treatment_in_past,
    setFertilityTreatmentStatus,
  ] = React.useState<string>("no");
  const [
    treatment_history_name,
    setTreatmentHistoryName,
  ] = React.useState<string>("");
  const [doctor_feedback, setDoctorFeedback] = React.useState<number>(0);
  const [doctor_description, setDocDescription] = React.useState<string>("");
  const handleBabyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBabyStatus(event.target.value as string);
  };
  const handleConsultChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setConsultedStatus(event.target.value as string);
  };
  const handleConsultDoctor = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setConsultDoctor(event.target.value as string);
  };
  const handleFertilityTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFertilityTreatmentStatus(event.target.value as string);
  };
  const handleResult = (
    event: React.MouseEvent<HTMLElement>,
    newResult: string
  ) => {
    setResult(newResult);
  };
  const handleBabyType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setBabyType(newType);
  };
  const handleDocFeedback = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDoctorFeedback(event.target.value as number);
  };

  useEffect(() => {
    setBabyStatus(data.any_baby);
    setBabyType(data.any_baby_process);
    setTryingToConcieve(data.trying_to_conceive);
    setConsultedStatus(data.consulted_with_any_doctors);
    setConsultDoctor(data.consulted_with_any_doctors_name);
    setDocDescription(data.doctor_description);
    setFertilityTreatmentStatus(data.taken_any_fertility_treatment_in_past);
    setTreatmentHistoryName(data.treatment_history_name);
    setResult(data.treatment_result);
  }, [data]);

  const submitForm = async () => {
    let body = {
      any_baby,
      any_baby_process,
      consulted_with_any_doctors,
      consulted_with_any_doctors_name,
      trying_to_conceive,
      taken_any_fertility_treatment_in_past,
      treatment_result: result,
      treatment_history_name,
      doctor_feedback,
      doctor_description,
    };

    await medicalHistory(body, id);
    setToggleForm(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Patient Medical History{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Having any baby</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={any_baby}
                  onChange={handleBabyChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {any_baby === "yes" ? (
              <div>
                <p>Type</p>
                <ToggleButtonGroup
                  value={any_baby_process}
                  exclusive
                  onChange={handleBabyType}
                  aria-label="text alignment"
                >
                  <ToggleButton value={"naturally"}>Naturally</ToggleButton>
                  <ToggleButton value={"fertility_treatment"}>
                    Fertility treatment
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            ) : null}
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Trying to concieve(In years)</p>
              <input
                style={{ width: "90%" }}
                type="text"
                className="other-text"
                value={trying_to_conceive}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  if (Validation(e.target.value)) {
                    setTryingToConcieve(e.target.value as number);
                  }
                }}
              />
            </div>
            <div>
              <p>Consulted with any doctors/centers</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={consulted_with_any_doctors}
                  onChange={handleConsultChange}
                  style={{ width: "90%" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {consulted_with_any_doctors === "yes" ? (
              <div>
                <p>Doctor name</p>
                <input
                  type="text"
                  placeholder="Write Doctor Name"
                  className="other-text"
                  style={{ width: "90%" }}
                  name=""
                  value={consulted_with_any_doctors_name}
                  onChange={handleConsultDoctor}
                />
              </div>
            ) : null}
          </div>
          {consulted_with_any_doctors === "yes" ? (
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Doctor Feedback</p>
                <FormControl variant="outlined" required>
                  <Select
                    id="demo-simple-select-required"
                    value={doctor_feedback}
                    onChange={handleDocFeedback}
                    style={{ width: "90%", maxWidth: "440.89px" }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={1}>PCOS/PCOD Problem</MenuItem>
                    <MenuItem value={2}>Period Problem</MenuItem>
                    <MenuItem value={3}>Low sperm count Problem</MenuItem>
                    <MenuItem value={4}>Fibo Problem</MenuItem>
                    <MenuItem value={5}>Low sperm count Problem</MenuItem>
                    <MenuItem value={6}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  className="other-text"
                  style={{ width: "90%" }}
                  name=""
                  value={doctor_description}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                    setDocDescription(e.target.value as string)
                  }
                />
              </div>
            </div>
          ) : null}

          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Taken any fertility treatment in past</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={taken_any_fertility_treatment_in_past}
                  onChange={handleFertilityTreatmentChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            {taken_any_fertility_treatment_in_past === "yes" ? (
              <>
                <div>
                  <p>Treatment name</p>
                  <input
                    type="text"
                    placeholder="Write Treatment Name"
                    className="other-text"
                    style={{ width: "90%" }}
                    value={treatment_history_name}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                      setTreatmentHistoryName(e.target.value as string)
                    }
                  />
                </div>
                <div>
                  <p>Result</p>
                  <ToggleButtonGroup
                    value={result}
                    exclusive
                    onChange={handleResult}
                    aria-label="text alignment"
                  >
                    <ToggleButton value={"yes"}>PASS</ToggleButton>
                    <ToggleButton value={"no"}>FAIL</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </>
            ) : null}
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
          disabled={loading_form_3}
        >
          <p>
            {loading_form_3 ? (
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
  loading_form_3: state.patientInfoReducer.loading_form_3,
});

export default connect(mapStateToProps, { medicalHistory })(MedicalHistory);
