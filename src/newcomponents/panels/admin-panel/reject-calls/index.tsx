import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";

import { RejectCalls } from "../../../../actions/admin-agent/leadTransferActions";

const useStyles = makeStyles({
  root: {
    minWidth: "50%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  RejectCalls: Function;
  loading: boolean;
}

const AdminRejectCalls: React.FC<Props> = ({ RejectCalls, loading }) => {
  const classes = useStyles();

  const [ids, setIDs] = React.useState<string>("");
  const [lead_type, setLeadType] = React.useState<string>("id");
  const [reason, setReason] = React.useState<string>("");
  const [otherReason, setOtherReason] = React.useState<string>("");

  const handleLeadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLeadType(event.target.value as string);
  };

  const handleReasonChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as string);
  };

  const handleOtherReasonChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherReason(event.target.value as string);
  };

  const handleIDs = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIDs(event.target.value as string);
  };

  const submitForm = async () => {
    let body = {
      lead_ids: ids.split(","),
      value: lead_type,
      comment: reason,
    };

    await RejectCalls(body);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="header-collapse">Reject Calls </div>
        <form className="form-fields info">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Lead ID</p>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={10}
                style={{ width: "100%" }}
                value={ids}
                onChange={handleIDs}
              />
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Number is</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={lead_type}
                  onChange={handleLeadChange}
                >
                  <MenuItem value={"number"}>Phone no</MenuItem>
                  <MenuItem value={"id"}>Lead ID</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Reject Reason</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={reason}
                  onChange={handleReasonChange}
                >
                  <MenuItem value={"Gender Selection- Illegal"}>
                    Gender Selection- Illegal
                  </MenuItem>
                  <MenuItem value={"Sperm Dono"}>Sperm Donor</MenuItem>
                  <MenuItem value={"Test Call"}>Test Call</MenuItem>
                  <MenuItem value={"Surrogacte Mother"}>
                    Surrogacte Mother
                  </MenuItem>
                  <MenuItem value={"Job Enquiry"}>Job Enquiry</MenuItem>
                  <MenuItem value={"Doctors Number"}>Doctors Number</MenuItem>
                  <MenuItem value={"Marketing Team/Social Media Number"}>
                    Marketing Team/Social Media Number
                  </MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-elements" style={{ display: "flex" }}>
              {reason === "Other" ? (
                <input
                  type="text"
                  placeholder="Write Language"
                  className="other-text"
                  name=""
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                />
              ) : null}
            </div>
          </div>
        </form>
        <CardActions style={{ padding: "8px 0" }}>
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
          >
            <p>
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size={24} />
              ) : (
                "Submit"
              )}
            </p>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.leadTransferReducer.loading,
});

export default connect(mapStateToProps, { RejectCalls })(AdminRejectCalls);
