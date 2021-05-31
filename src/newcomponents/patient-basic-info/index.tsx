import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { patientDetails } from "../../actions/dashboardActions";
import Moment from "react-moment";
import CommentsModal from "../positive-calls-main/comment";
import "./index.sass";

const useStyles = makeStyles({
  root: {
    maxWidth: 445.17,
    background: "#F7F7F7",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    borderBottom: "1px solid rgba(0,0,0,0.5)",
    marginBottom: "15px",
  },
  button: {
    background: "#924A91",
    padding: "10px 15px",
    color: "#fff",
    alignItems: "flex-end",
  },
});

interface Props {
  patientDetails: Function;
  patient_data: any;
  loading: boolean;
}

const PatientBasicInfo: React.FC<Props> = ({
  patientDetails,
  patient_data,
  loading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [leadId, setLeadId] = React.useState<number>(0);

  useEffect(() => {
    patientDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: number) => {
    setOpen(true);
    setLeadId(id);
  };

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  return (
    <>
      <Card className={classes.root} variant="outlined">
        {loading ? (
          <div className="loading-text">
            <h2 className="loading">Loading...</h2>
          </div>
        ) : !isEmpty(patient_data) && patient_data.count > 0 ? (
          <>
            <CardContent style={{ height: "80%" }}>
              <h2 className={classes.heading}>Patient Basic Info</h2>
              <div className="patient-info-details">
                <li>
                  <p>
                    Lead ID:{" "}
                    <span>
                      {patient_data.results[0].id
                        ? patient_data.results[0].id
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Call Status:{" "}
                    <span>
                      {patient_data.results[0].call_status
                        ? patient_data.results[0].call_status
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Husband Name:{" "}
                    <span>
                      {patient_data.results[0].husband_name
                        ? patient_data.results[0].husband_name
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Wife Name:{" "}
                    <span>
                      {patient_data.results[0].wife_name
                        ? patient_data.results[0].wife_name
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Relative Name:{" "}
                    <span>
                      {patient_data.results[0].primary_name
                        ? patient_data.results[0].primary_name
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    City:{" "}
                    <span>
                      {patient_data.results[0].patient_city
                        ? patient_data.results[0].patient_city
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Area:{" "}
                    <span>
                      {patient_data.results[0].patient_area
                        ? patient_data.results[0].patient_area
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Treatment:{" "}
                    <span>
                      {patient_data.results[0].treatment
                        ? patient_data.results[0].treatment
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Last Call Date:{" "}
                    <span>
                      {patient_data.results[0].updated_at ? (
                        <Moment parse="YYYY-MM-DD HH:mm">
                          {patient_data.results[0].updated_at}
                        </Moment>
                      ) : (
                        "NA"
                      )}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Followup Date:{" "}
                    <span>
                      {patient_data.results[0].followup_date
                        ? patient_data.results[0].followup_date
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Lead Source:{" "}
                    <span>
                      {patient_data.results[0].lead_source
                        ? patient_data.results[0].lead_source
                        : "NA"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Call Date:{" "}
                    <span>
                      {patient_data.results[0].created_at
                        ? patient_data.results[0].created_at.substring(0, 10)
                        : "NA"}
                    </span>
                  </p>
                </li>
              </div>
            </CardContent>
            <CardActions style={{ display: "flex", height: "20%" }}>
              <Link to="/dashboard/ce/patient/update-info">
                <button className={classes.button} disabled>
                  Update Info
                </button>
              </Link>
              <Link to="/dashboard/ce/patient/fill-info">
                <button className={classes.button}>Fill Info</button>
              </Link>
              <button
                className={classes.button}
                onClick={() => handleClick(patient_data.results[0].id)}
              >
                Comments
              </button>
            </CardActions>
          </>
        ) : (
          <div className="loading-text">
            <h2 className="loading">No Leads</h2>
          </div>
        )}
        <CommentsModal open={open} setOpen={setOpen} leadId={leadId} />
      </Card>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
  loading: state.dashboardReducer.loading,
});

export default connect(mapStateToProps, { patientDetails })(PatientBasicInfo);
