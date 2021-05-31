import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { connect } from "react-redux";
import Moment from "react-moment";

import { isEmpty } from "../../../../helpers/isEmpty";
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
}

const CallDetails: React.FC<Props> = ({ read_appointment_data }) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Call Information{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info parted"
          style={{ display: !toggleForm ? "none" : "flex" }}
        >
          <div className="part-left">
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Husband name: </p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.husband_name
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Husband Age:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.husband_age
                    : "NA"}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Wife name:</p>
                {!isEmpty(read_appointment_data) &&
                !isEmpty(read_appointment_data.lead)
                  ? read_appointment_data.lead.wife_name
                  : "NA"}
                <span></span>
              </div>
              <div>
                <p>Wife Age:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.wife_age
                    : "NA"}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Patient City:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.patient_city
                    : "NA"}
                </span>
              </div>
              <div>
                <p>Treatment City:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.treatment_city
                    : "NA"}
                </span>
              </div>
            </div>
          </div>
          <div className="part-right">
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Call Id:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.id
                    : "NA"}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Source:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.lead_source
                    : "NA"}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Creation Date:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead) ? (
                    <Moment parse="YYYY-MM-DD HH:mm">
                      {read_appointment_data.lead.created_at}
                    </Moment>
                  ) : (
                    "NA"
                  )}
                </span>
              </div>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Patient Support:</p>
                <span>
                  {!isEmpty(read_appointment_data) &&
                  !isEmpty(read_appointment_data.lead)
                    ? read_appointment_data.lead.panel_user
                    : "NA"}
                </span>
              </div>
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
  read_appointment_data: state.appointmentsReducer.read_appointment_data,
});

export default connect(mapStateToProps)(CallDetails);
