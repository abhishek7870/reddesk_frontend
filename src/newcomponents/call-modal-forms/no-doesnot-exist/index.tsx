import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setDoesNotExistComments } from "../../../actions/commentActions";
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

const NotExists: React.FC<Props> = ({
  setDoesNotExistComments,
  patient_data,
  setOpen,
  loading,
}) => {
  let query = useQuery();
  const classes = useStyles();
  const [status, setStatus] = React.useState("none");
  let history = useHistory();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };
  const submitForm = async () => {
    let lead_comment = query.get("id")
      ? query.get("id")
      : patient_data.results[0].id;
    let body = {
      category: 2,
      sub_category: status,
      lead_comment,
    };

    await setDoesNotExistComments(body);
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
            value={status}
            onChange={handleChange}
          >
            <MenuItem value={"none"}>Status</MenuItem>
            <MenuItem value={"Invalid-No"}>Invalid No.</MenuItem>
            <MenuItem value={"Temporarily-out-of-service"}>
              Temporarily out of service
            </MenuItem>
            <MenuItem value={"incoming-not-available"}>
              Incoming not available
            </MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
        </FormControl>
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

export default connect(mapStateToProps, { setDoesNotExistComments })(NotExists);
