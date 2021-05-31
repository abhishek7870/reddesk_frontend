import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import AdminAppointmentTable from "../../../admin-panel/tables/appointments";
import { getAppointmentFilterData } from "../../../../../actions/admin-agent/filterActions";
import { getFilteredAppointments } from "../../../../../actions/admin-agent/tableActions";
import { isEmpty } from "../../../../../helpers/isEmpty";
import { doctorFilter } from "../../../../../helpers/fixComment";
import { generateAppointmentsUrl } from "../../../../../helpers/generateUrl";

interface Props {
  getAppointmentFilterData: Function;
  getFilteredAppointments: Function;
  appointment_filter_data: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PccConversionFilter: React.FC<Props> = ({
  getAppointmentFilterData,
  appointment_filter_data,
  getFilteredAppointments,
}) => {
  let query = useQuery();
  const [treatment, setTreatment] = React.useState<number>(0);
  const [clinic, setClinic] = React.useState<number>(0);
  const [city, setCity] = React.useState<number>(0);
  const [doctor, setDoctor] = React.useState<number>(0);
  const [id, setId] = React.useState<number>(0);
  const [pcc, setPcc] = React.useState<string>("all");
  const [status, setStatus] = React.useState<number>(0);
  const [ptsupport, setPtSupport] = React.useState<number>(0);
  // const [appt_Date_start, setApptDateStart] = React.useState<string>("");
  const [start_date, setStartDate] = React.useState<string>("");
  const [end_date, setEndDate] = React.useState<string>("");

  const handleClinicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClinic(event.target.value as number);
  };
  const handleCityChange =(event: React.ChangeEvent<{value: unknown }>) => {
      setCity(event.target.value as number);
  };

  const handleDoctorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDoctor(event.target.value as number);
  };

  const handleLeadIdChange = (event:React.ChangeEvent<{value : unknown}>) => {
   setId(event.target.value as number);
  };
  const handleTreatIdChange = (event:React.ChangeEvent<{value : unknown}>) => {
    setId(event.target.value as number);
   };

  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as number);
  };
  const handlePccChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPcc(event.target.value as string);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as number);
  };
  const handleTreatStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as number);
  };

  const handlePtSupportChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPtSupport(event.target.value as number);
  };

  const handleAppointmentDateStart = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setStartDate(event.target.value as string);
  };

  const handleTreatmentDateStart = (
    event:React.ChangeEvent< { value: unknown}>
  ) => {
    setStartDate(event.target.value as string);
    
  };
  const handleTreatmentDateEnd = (
    event: React.ChangeEvent< { value : unknown }>
  ) => {
    setEndDate(event?.target.value as string) ;
  };

  const handleAppointmentDateEnd = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEndDate(event.target.value as string);
  };

  useEffect(() => {
    getAppointmentFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async () => {
    let body = {
      appt_status: status,
      treat_status: status,
      center: clinic,
      city: city,
      doctor,
      lead_id: id,
      treat_id: id,
      treatment,
      ptsupport,
      pcc,
      treat_date_start:start_date,
      treat_date_end:end_date,  
      appt_date_start: start_date,
      appt_date_end: end_date,
      day: query.get("day"),
    };

    await getFilteredAppointments(generateAppointmentsUrl(body));
  };

  return (
    <>
      <div className="filter-header">
        <form className="form-fields info filter-form">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={clinic}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleClinicChange}
                >
                  <MenuItem value={0}>All Centers</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.center.length > 0
                    ? appointment_filter_data.center.map((src: any) => (
                        <MenuItem value={src.id}>{src.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={city}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleCityChange}
                >
                  <MenuItem value={0}>All City</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.center.length > 0
                    ? appointment_filter_data.center.map((src: any) => (
                        <MenuItem value={src.id}>{src.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={doctor}
                  onChange={handleDoctorChange}
                  defaultValue={0}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>All Doctors</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.doctor.length > 0 &&
                  doctorFilter(clinic, appointment_filter_data.doctor).length >
                    0
                    ? doctorFilter(
                        clinic,
                        appointment_filter_data.doctor
                      ).map((item: any) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))
                    : "NA"}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={pcc}
                  onChange={handlePccChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="all">Pcc</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={status}
                  onChange={handleTreatStatusChange}
                >
                  <MenuItem value={0}>Treat Status</MenuItem>
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
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={status}
                  onChange={handleStatusChange}
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
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={id}
                  onChange={handleLeadIdChange}
                >
                  <MenuItem value={0}>Lead Id</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.appt_status.length > 0
                    ? appointment_filter_data.appt_status.map((src: any) => (
                        <MenuItem value={src.id}>{src.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={treatment}
                  onChange={handleTreatmentChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>All Treatment</MenuItem>
                  <MenuItem value={3}>SURROGACY</MenuItem>
                  <MenuItem value={2}>IVF</MenuItem>
                  <MenuItem value={1}>IUI</MenuItem>
                  <MenuItem value={4}>HISTRO/LAPROSCOPY</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={ptsupport}
                  onChange={handlePtSupportChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>Pt Support</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.pcc.length > 0
                    ? appointment_filter_data.pcc.map((src: any) => (
                        <MenuItem value={src.id}>{src.user}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="date"
                type="date"
                label="Appt Start Date"
                value={start_date}
                onChange={handleAppointmentDateStart}
                variant="outlined"
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                id="date2"
                type="date"
                label="Appt End Date"
                value={end_date}
                onChange={handleAppointmentDateEnd}
                variant="outlined"
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
                label="Treat Start Date"
                value={start_date}
                onChange={handleTreatmentDateStart}
                variant="outlined"
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                id="date2"
                type="date"
                label="Treat End Date"
                value={end_date}
                onChange={handleTreatmentDateEnd}
                variant="outlined"
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
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={id}
                  onChange={handleTreatIdChange}
                >
                  <MenuItem value={0}>Treat Id</MenuItem>
                  {!isEmpty(appointment_filter_data) &&
                  appointment_filter_data.appt_status.length > 0
                    ? appointment_filter_data.appt_status.map((src: any) => (
                        <MenuItem value={src.id}>{src.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <Button
                style={{
                  background: "#EB5A46",
                  color: "#fff",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  width: "10%",
                  maxWidth: "440.89px",
                }}
                onClick={submitForm}
              >
                Filter
              </Button>
            </div>
          </div>
        </form>
      </div>
      <AdminAppointmentTable />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  appointment_filter_data: state.AdminFilterReducer.appointment_filter_data,
});

export default connect(mapStateToProps, {
  getAppointmentFilterData,
  getFilteredAppointments,
})(PccConversionFilter);
