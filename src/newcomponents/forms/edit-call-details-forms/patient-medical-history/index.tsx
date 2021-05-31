import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { isEmpty } from "../../../../helpers/isEmpty";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  read_call_details: any;
}

const PatientMedicalHistory: React.FC<Props> = ({ read_call_details }) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);

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
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.any_baby
                    : ""
                }
              />
            </div>
            <div>
              <p>Type</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.any_baby_process
                    : ""
                }
              />
            </div>
            <div>
              <p>Trying to concieve (in yrs)</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.trying_to_conceive
                    : ""
                }
              />
            </div>
            <div>
              <p>Consulted with any doctor</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                className="other-text"
                type="text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.consulted_with_any_doctors
                    : ""
                }
              />
            </div>
          </div>

          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Doctor Name</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.consulted_with_any_doctors_name
                    : ""
                }
              />
            </div>
            <div>
              <p>Doctor Feedback</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.doctor_feedback
                    : ""
                }
              />
            </div>
            <div>
              <p>Description</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.doctor_description
                    : ""
                }
              />
            </div>
            <div>
              <p>Taken any fertility treatment</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead
                        .taken_any_fertility_treatment_in_past
                    : ""
                }
              />
            </div>
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
  read_call_details: state.positiveCallsReducer.read_call_details,
});

export default connect(mapStateToProps)(PatientMedicalHistory);
