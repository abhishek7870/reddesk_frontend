import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CallIcon from "@material-ui/icons/Call";
import CallModal from "../call-modal";
import ForumIcon from "@material-ui/icons/Forum";
import { connect } from "react-redux";
import { isEmpty } from "../../helpers/isEmpty";
import { clickToCall } from "../../actions/dashboardActions";
import "./index.sass";

const useStyles = makeStyles({
  root: {
    maxWidth: 475,
    height: 345,
    background: "#F7F7F7",
    paddingBottom: 30,
  },
  heading: {
    textAlign: "center",
    borderBottom: "1px solid rgba(0,0,0,0.5)",
    marginBottom: "15px",
  },
  button: {
    background: "#924A91",
    padding: "15px 25px",
    color: "#fff",
    alignItems: "flex-end",
    textAlign: "center",
    width: "100%",
    marginTop: 28,
    borderRadius: "5px",
  },
});

interface Props {
  patient_data: any;
  clickToCall: Function;
}

const CallDetails: React.FC<Props> = ({ patient_data, clickToCall }) => {
  const classes = useStyles();

  const [showDialog1, setShowDialog1] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (e: any, c_type: string) => {
    e.stopPropagation();
    setShowCallDialog(false);
    clickToCall(patient_data.results[0].id, c_type);
  };

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent style={{ height: "100%" }}>
          <h2 className={classes.heading}>Call Details</h2>
          <div className="call-details">
            <div className="top">
              <div className="in-out">
                <div className="in">
                  <div>Pick Incoming</div>
                  <button>
                    <CallIcon />
                  </button>
                </div>
                <div className="out">
                  <div>Dial Outgoing</div>
                  {!isEmpty(patient_data) && patient_data.count > 0 ? (
                    <div
                      className="dropdown1"
                      style={{
                        top: showCallDialog ? "150%" : "-990%",
                        padding: 0,
                        color: "#924A91",
                      }}
                    >
                      <li onClick={(e) => handleClick(e, "lead")}>
                        <span className="bold">Lead</span>
                      </li>
                      {patient_data.results[0].primary_contact ? (
                        <li onClick={(e) => handleClick(e, "primary")}>
                          <span className="bold">Primary</span>
                        </li>
                      ) : null}
                      {patient_data.results[0].secondary_contact ? (
                        <li onClick={(e) => handleClick(e, "secondary")}>
                          <span className="bold">Secondary</span>
                        </li>
                      ) : null}
                    </div>
                  ) : null}
                  <button onClick={() => setShowCallDialog(!showCallDialog)}>
                    <CallIcon />
                  </button>
                </div>
              </div>
              <div className="middle">
                <div style={{ background: "lightgreen" }}>Recieved</div>
                <div style={{ background: "orange" }}>Missed</div>
                <div style={{ background: "lightblue" }}>Other</div>
              </div>
            </div>
            <div className="bottom">
              <button>Calls</button>
              <button
                className="positive"
                onClick={() => setShowDialog1(!showDialog1)}
              >
                Positive Calls
                <div
                  className="dropdown1"
                  style={{ top: showDialog1 ? "-290%" : "250%" }}
                >
                  <Link to="/dashboard/ce/patient/positive-calls?day=today">
                    <li>
                      <span className="bold">Today:</span>
                      <span></span>
                    </li>
                  </Link>
                  <Link to="/dashboard/ce/patient/positive-calls?day=tomorrow">
                    <li>
                      <span className="bold">Tomorrow:</span>
                      <span></span>
                    </li>
                  </Link>
                  <Link to="/dashboard/ce/patient/positive-calls?day=weeks">
                    <li>
                      <span className="bold">This Week:</span>
                      <span></span>
                    </li>
                  </Link>
                  <Link to="/dashboard/ce/patient/positive-calls?day=all">
                    <li>
                      <span className="bold">All Positive</span>
                      <span></span>
                    </li>
                  </Link>
                </div>
              </button>
              <button
                className="appoint"
                onClick={() => setShowDialog2(!showDialog2)}
              >
                Appointments
                <div
                  className="dropdown1"
                  style={{ top: showDialog2 ? "-290%" : "250%" }}
                >
                  <Link to="/dashboard/ce/patient/appointments?day=today">
                    <li>
                      <span className="bold">Today:</span>
                      <span></span>
                    </li>
                  </Link>

                  <Link to="/dashboard/ce/patient/appointments?day=tomorrow">
                    <li>
                      <span className="bold">Tomorrow:</span>
                      <span></span>
                    </li>
                  </Link>
                  <Link to="/dashboard/ce/patient/appointments?day=weeks">
                    <li>
                      <span className="bold">This Week:</span>
                      <span></span>
                    </li>
                  </Link>
                  <Link to="/dashboard/ce/patient/appointments?day=all">
                    <li>
                      <span className="bold">All Appointments:</span>
                      <span></span>
                    </li>
                  </Link>
                </div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        style={{ maxWidth: "475px" }}
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        <p
          style={{
            textAlign: "center",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Send message to patients <ForumIcon style={{ marginLeft: "5px" }} />
        </p>
      </button>
      <CallModal open={open} setOpen={setOpen} heading={"Send SMS"} index={6} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps, { clickToCall })(CallDetails);
