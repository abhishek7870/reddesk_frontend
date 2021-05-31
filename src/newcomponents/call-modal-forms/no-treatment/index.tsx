import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { setDoesNotExistComments } from "../../../actions/commentActions";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  setDoesNotExistComments: Function;
  patient_data: any;
  setOpen: Function;
  loading: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NoAppointment: React.FC<Props> = ({
  setDoesNotExistComments,
  patient_data,
  setOpen,
  loading,
}) => {
  const classes = useStyles();
  let query = useQuery();
  let history = useHistory();
  const [reason, setReason] = React.useState("none");
  const [comment, setComment] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as string);
  };
  const handleCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setComment(event.target.value as string);
  };
  const submitForm = async () => {
    let lead_comment = query.get("id")
      ? query.get("id")
      : patient_data.results[0].id;
    let body = {
      category: 5,
      sub_category: reason,
      comment,
      lead_comment,
    };
    await setDoesNotExistComments(body);
    // setTimeout(() => setOpen(false), 300);
    setOpen(false);
    history.push("/dashboard");
  };
  return (
    <form className="modal-form">
      <div className="modal-form-fields">
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={reason}
            onChange={handleChange}
          >
            <MenuItem value={"none"}>Select Reason</MenuItem>
            <MenuItem value={"started-treatment"}>
              Started treatment from other center
            </MenuItem>
            <MenuItem value={"dont-want"}>
              Don't want to go through crysta
            </MenuItem>
            <MenuItem value={"budget-issue"}>Budget issue</MenuItem>
            <MenuItem value={"postponed"}>Postponed treatment plan</MenuItem>
            <MenuItem value={"location-issue"}>
              Location/Distance issue
            </MenuItem>
            <MenuItem value={"want-non-crysta"}>
              Want non crysta doctor/center
            </MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="modal-form-fields">
        {reason === "other" ? (
          <TextField
            id="outlined-basic"
            placeholder="Other Comments"
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
          />
        ) : null}
      </div>
      <div className="modal-form-fields">
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={submitForm}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
  loading: state.commentsReducer.loading,
});

export default connect(mapStateToProps, { setDoesNotExistComments })(
  NoAppointment
);
