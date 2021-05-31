import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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

const CallDetails: React.FC<Props> = ({ read_call_details }) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Call Details{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Call Status</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.call_status
                    : ""
                }
              />
            </div>
            <div>
              <p>Priority</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.priority
                    : ""
                }
              />
            </div>
            <div>
              <p>Followup Date/Time</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? `${read_call_details.lead.followup_date} ${read_call_details.lead.followup_time}`
                    : ""
                }
              />
            </div>
            <div>
              <p>Creation Date</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
              />
            </div>
          </div>

          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Patient Support</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.panel_user
                    : ""
                }
              />
            </div>
            <div>
              <p>Source of call</p>
              <input
                style={{ width: "90%", maxWidth: "440.89px" }}
                type="text"
                className="other-text"
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  !isEmpty(read_call_details.lead)
                    ? read_call_details.lead.lead_source
                    : ""
                }
              />
            </div>
            <div>
              <p>Suggested Center List</p>
              <TextareaAutosize
                disabled
                value={
                  !isEmpty(read_call_details) &&
                  read_call_details.center.length > 0
                    ? read_call_details.center.map(
                        (center: any) => center.center
                      )
                    : ""
                }
                rowsMin={3}
                rowsMax={3}
                style={{ width: "90%", maxWidth: "440.89px" }}
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

export default connect(mapStateToProps)(CallDetails);
