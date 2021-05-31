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

const PatientBasic: React.FC<Props> = ({ read_call_details }) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Patient Basic Details{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Husband name</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.husband_name
                    : ""
                }
              />
            </div>
            <div>
              <p>Husband Age</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.husband_age
                    : ""
                }
              />
            </div>
            <div>
              <p>Wife name</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.wife_name
                    : ""
                }
              />
            </div>
            <div>
              <p>Wife age</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                className="other-text"
                type="text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.wife_age
                    : ""
                }
              />
            </div>
          </div>

          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Patient City</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.patient_city
                    : ""
                }
              />
            </div>
            <div>
              <p>Patient Area</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.patient_area
                    : ""
                }
              />
            </div>
            <div>
              <p>Treatment City</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.treatment_city
                    : ""
                }
              />
            </div>
            <div>
              <p>Treatment Area</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.treatment_area
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Relative name</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.primary_name
                    : ""
                }
              />
            </div>
            <div>
              <p>Language</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.language
                    : ""
                }
              />
            </div>
            <div>
              <p>Marriage Duration (In Yrs)</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.marriage_duration
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

export default connect(mapStateToProps)(PatientBasic);
