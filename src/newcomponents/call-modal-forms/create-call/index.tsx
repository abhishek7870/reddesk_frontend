import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { createCall, getLeadSource } from "../../../actions/commentActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { isEmpty } from "../../../helpers/isEmpty";

interface Props {
  createCall: Function;
  getLeadSource: Function;
  loading: boolean;
  lead_source: any;
  setOpen: Function;
}

const CreateCall: React.FC<Props> = ({
  createCall,
  loading,
  setOpen,
  getLeadSource,
  lead_source,
}) => {
  const [patient_name, setPatientName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<number | null>(null);
  const [treatment, setTreatment] = React.useState("IVF");
  const [source, setSource] = React.useState<string>("none");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPatientName(event.target.value as string);
  };

  const handlePhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhone(event.target.value as number);
  };

  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as string);
  };
  const handleSourceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSource(event.target.value as string);
  };

  useEffect(() => {
    getLeadSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async () => {
    let body = {
      name: patient_name,
      phone_no: phone,
      treatment,
      source,
    };
    await createCall(body);
    setOpen(false);
  };
  return (
    <form className="modal-form">
      <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
        <TextField
          id="outlined-basic"
          placeholder="Patient name"
          variant="outlined"
          value={patient_name}
          onChange={handleChange}
        />
      </div>
      <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
        <TextField
          id="outlined-basic"
          placeholder="Mobile No."
          variant="outlined"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
        <FormControl variant="outlined" required>
          <Select
            id="demo-simple-select-required"
            value={treatment}
            onChange={handleTreatmentChange}
            style={{ width: "100%", maxWidth: "440.89px" }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Surrogacy"}>SURROGACY</MenuItem>
            <MenuItem value={"IVF"}>IVF</MenuItem>
            <MenuItem value={"IUI"}>IUI</MenuItem>
            <MenuItem value={"Histro/Lapro"}>HISTRO/LAPROSCOPY</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="modal-form-fields">
        <FormControl variant="outlined" required>
          <Select
            id="demo-simple-select-required"
            value={source}
            onChange={handleSourceChange}
            style={{ width: "100%", maxWidth: "440.89px" }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="none">Lead Source</MenuItem>
            {!isEmpty(lead_source) && lead_source.results.length > 0
              ? lead_source.results.map((source: any) => (
                  <MenuItem value={source.name}>{source.name}</MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </div>
      <div className="modal-form-fields">
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px", minWidth: "50%" }}
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
  lead_source: state.commentsReducer.lead_source,
});

export default connect(mapStateToProps, { createCall, getLeadSource })(
  CreateCall
);
