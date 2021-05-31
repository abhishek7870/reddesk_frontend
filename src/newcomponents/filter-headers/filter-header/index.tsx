import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { setFilterOne } from "../../../actions/filterActions";
import { useLocation } from "react-router-dom";
import { isEmpty } from "../../../helpers/isEmpty";
import { generateAppointmentsUrl } from "../../../helpers/generateUrl";

import "./index.sass";

interface Props {
  setFilterOne: Function;
  appointment_filter_data: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FilterHeader: React.FC<Props> = ({
  appointment_filter_data,
  setFilterOne,
}) => {
  let query = useQuery();
  const [clinic, setClinic] = React.useState<number>(0);
  const [status, setStatus] = React.useState<number>(0);
  const [city, setCity] = React.useState<number>(0);
  const [handled_by, setHandledBy] = React.useState<number>(0);
  const [appt_Date_start, setApptDateStart] = React.useState<string>("");
  const [appt_Date_end, setApptDateEnd] = React.useState<string>("");
  const [treatment, setTreatment] = React.useState<number>(0);

  const handleClinicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClinic(event.target.value as number);
  };
  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as number);
  };

  const handleHandledBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHandledBy(event.target.value as number);
  };
  const handleAppointmentDateStart = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setApptDateStart(event.target.value as string);
  };
  const handleAppointmentDateEnd = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setApptDateEnd(event.target.value as string);
  };
  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as number);
  };

  const submitForm = () => {
    let body = {
      appt_date_start: appt_Date_start,
      appt_date_end: appt_Date_end,
      center: clinic,
      appt_status: status,
      city,
      pcc: handled_by,
      treatment,
      day: query.get("day"),
    };
    setFilterOne(generateAppointmentsUrl(body));
  };
  return (
    <div className="filter-header">
      <form className="form-fields info">
        <div className="form-elements" style={{ display: "flex" }}>
          <div>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={clinic}
                onChange={handleClinicChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>All Center</MenuItem>
                {!isEmpty(appointment_filter_data) &&
                appointment_filter_data.center.length > 0
                  ? appointment_filter_data.center.map((center: any) => (
                      <MenuItem value={center.id}>{center.name}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={status}
                onChange={handleStatusChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>All Status</MenuItem>
                {!isEmpty(appointment_filter_data) &&
                appointment_filter_data.appt_status.length > 0
                  ? appointment_filter_data.appt_status.map((src: any) => (
                      <MenuItem value={src.id}>{src.name}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" required>
              {!isEmpty(appointment_filter_data) &&
              appointment_filter_data.cities.length > 0 ? (
                <Autocomplete
                  id="combo-box-demo"
                  // value={treatment_city}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      let obj = JSON.parse(JSON.stringify(newValue, null, " "));

                      setCity(obj.id);
                    }
                  }}
                  options={appointment_filter_data.cities}
                  freeSolo
                  getOptionLabel={(option: any) => option.display_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      style={{ width: "90%", maxWidth: "440.89px" }}
                    />
                  )}
                />
              ) : (
                <TextField variant="outlined" />
              )}
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={handled_by}
                onChange={handleHandledBy}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>All PCC</MenuItem>
                {!isEmpty(appointment_filter_data) &&
                appointment_filter_data.pcc.length > 0
                  ? appointment_filter_data.pcc.map((pcc: any) => (
                      <MenuItem value={pcc.id}>{pcc.user}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-elements" style={{ display: "flex" }}>
          <div>
            <TextField
              id="date"
              type="date"
              label="Start Date"
              variant="outlined"
              disabled={
                query.get("day") === "today" ||
                query.get("day") === "tomorrow" ||
                query.get("day") === "week"
              }
              value={appt_Date_start}
              onChange={handleAppointmentDateStart}
              inputProps={{ "aria-label": "Without label" }}
              style={{ width: "90%", maxWidth: "440.89px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="date"
              type="date"
              label="Start Date"
              variant="outlined"
              disabled={
                query.get("day") === "today" ||
                query.get("day") === "tomorrow" ||
                query.get("day") === "week"
              }
              value={appt_Date_end}
              onChange={handleAppointmentDateEnd}
              inputProps={{ "aria-label": "Without label" }}
              style={{ width: "90%", maxWidth: "440.89px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={treatment}
                onChange={handleTreatmentChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>All treatment</MenuItem>
                <MenuItem value={3}>SURROGACY</MenuItem>
                <MenuItem value={2}>IVF</MenuItem>
                <MenuItem value={1}>IUI</MenuItem>
                <MenuItem value={4}>HISTRO/LAPROSCOPY</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                style={{
                  background: "#EB5A46",
                  color: "#fff",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  width: "90%",
                  maxWidth: "440.89px",
                }}
                size="large"
                onClick={submitForm}
              >
                Filter
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  appointment_filter_data: state.dropdownReducer.appointment_filter_data,
});

export default connect(mapStateToProps, {
  setFilterOne,
})(FilterHeader);
