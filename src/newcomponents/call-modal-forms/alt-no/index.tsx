import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addAltNumber } from "../../../actions/commentActions";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  addAltNumber: Function;
  loading: boolean;
  setOpen: Function;
  patient_data: any;
  user: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AddAltNumber: React.FC<Props> = ({
  addAltNumber,
  loading,
  setOpen,
  patient_data,
  user,
}) => {
  let query = useQuery();
  const [phone, setPhone] = React.useState<number | null>(null);
  const [lead, setLead] = React.useState<number | null>(null);

  const handlePhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhone(event.target.value as number);
  };
  const handleLeadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLead(event.target.value as number);
  };

  const submitForm = async () => {
    let content_number = phone;
    let id =
      user.user.user_group === "ADMIN"
        ? lead
        : query.get("id")
        ? query.get("id")
        : patient_data.results[0].id;
    await addAltNumber(content_number, id);
    setOpen(false);
  };
  return (
    <form className="modal-form">
      <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
        <TextField
          id="outlined-basic"
          placeholder="Mobile No."
          variant="outlined"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      {user.user.user_group === "ADMIN" ? (
        <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
          <TextField
            id="outlined-basic"
            placeholder="Lead ID"
            variant="outlined"
            value={lead}
            onChange={handleLeadChange}
          />
        </div>
      ) : null}
      <div className="modal-form-fields">
        <Button
          variant="contained"
          color="secondary"
          style={{ minWidth: "50%" }}
          disabled={loading}
          onClick={submitForm}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.commentsReducer.loading,
  patient_data: state.dashboardReducer.patient_data,
  user: state.loginReducer.user,
});

export default connect(mapStateToProps, { addAltNumber })(AddAltNumber);
