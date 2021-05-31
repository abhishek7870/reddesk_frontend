import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { setRingComments } from "../../../actions/commentActions";

import "./index.sass";

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
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9,
  },
}));

interface Props {
  setRingComments: Function;
  patient_data: any;
  loading: boolean;
  snackBarUpdate: Function;
  setOpen: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RingOption: React.FC<Props> = ({
  setRingComments,
  patient_data,
  loading,
  setOpen,
}) => {
  let query = useQuery();
  const classes = useStyles();
  const [status, setStatus] = React.useState<string>("none");
  let history = useHistory();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const submitForm = async () => {
    let lead_comment = query.get("id")
      ? query.get("id")
      : patient_data.results[0].id;
    let body = {
      category: 1,
      sub_category: status,
      lead_comment,
    };
    await setRingComments(body);

    setOpen(false);
    history.push("/dashboard");
    // setTimeout(() => setOpen(false), 300);
  };
  return (
    <form className="modal-form">
      <FormControl variant="outlined" className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel> */}
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={status}
          onChange={handleChange}
          required
        >
          <MenuItem value={"none"}>Status</MenuItem>
          <MenuItem value={"Ringing"}>Ringing</MenuItem>
          <MenuItem value={"Switch-off"}>Switch Off</MenuItem>
          <MenuItem value={"Cut the call"}>Cut the call</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px", minWidth: "50%" }}
        onClick={submitForm}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
  loading: state.commentsReducer.loading,
});

export default connect(mapStateToProps, { setRingComments })(RingOption);
