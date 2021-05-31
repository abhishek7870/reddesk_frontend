import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import AdminPositiveCallsTable from "../../tables/positiveCalls";
import { getCallFilterData } from "../../../../../actions/admin-agent/filterActions";
import { getFilteredPositiveCalls } from "../../../../../actions/admin-agent/tableActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { isEmpty } from "../../../../../helpers/isEmpty";
import { generateCallsUrl } from "../../../../../helpers/generateUrl";

interface Props {
  getCallFilterData: Function;
  getFilteredPositiveCalls: Function;
  calls_filter_data: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AdminPositiveCallFilter: React.FC<Props> = ({
  getCallFilterData,
  calls_filter_data,
  getFilteredPositiveCalls,
}) => {
  let query = useQuery();
  const [treatment, setTreatment] = React.useState<number>(0);
  const [treatment_city, setTreatmentCity] = React.useState<number>(0);
  const [source, setSources] = React.useState<string>("all");
  const [status, setStatus] = React.useState<string>("all");
  const [agent, setAgent] = React.useState<number>(0);

  const [language, setLanguage] = React.useState<string>("all");
  // const [appt_Date_start, setApptDateStart] = React.useState<string>("");
  const [start_date, setStartDate] = React.useState<string>("");
  const [end_date, setEndDate] = React.useState<string>("");

  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as number);
  };

  const handleAgentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAgent(event.target.value as number);
  };
  const handleSourceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSources(event.target.value as string);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };

  const handleAppointmentDateStart = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setStartDate(event.target.value as string);
  };
  const handleAppointmentDateEnd = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEndDate(event.target.value as string);
  };

  useEffect(() => {
    getCallFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async () => {
    let body = {
      city: treatment_city,
      lead_source: source,
      treatment,
      panel_user: agent,
      priority: "",
      language,
      status,
      followup_date_start: start_date,
      followup_date_end: end_date,
      day: query.get("day"),
    };

    await getFilteredPositiveCalls(generateCallsUrl(body));
  };

  return (
    <>
      <div className="filter-header">
        <form className="form-fields info filter-form">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <FormControl variant="outlined" required>
                {!isEmpty(calls_filter_data) &&
                calls_filter_data.cities.length > 0 ? (
                  <Autocomplete
                    id="combo-box-demo"
                    defaultValue="All Cities"
                    onChange={(event, newValue) => {
                      if (newValue) {
                        let obj = JSON.parse(
                          JSON.stringify(newValue, null, " ")
                        );

                        setTreatmentCity(obj.id);
                      } else {
                        setTreatmentCity(0);
                      }
                    }}
                    options={calls_filter_data.cities}
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
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={source}
                  onChange={handleSourceChange}
                >
                  <MenuItem value="all">All Sources</MenuItem>
                  {!isEmpty(calls_filter_data) &&
                  calls_filter_data.source.length > 0
                    ? calls_filter_data.source.map((src: any) => (
                        <MenuItem value={src.uuid}>{src.name}</MenuItem>
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
                  <MenuItem value="all">All Status</MenuItem>
                  {!isEmpty(calls_filter_data) &&
                  calls_filter_data.call_status.length > 0
                    ? calls_filter_data.call_status.map((src: any) => (
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
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={agent}
                  onChange={handleAgentChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>All Agents</MenuItem>
                  {!isEmpty(calls_filter_data) &&
                  calls_filter_data.pcc.length > 0
                    ? calls_filter_data.pcc.map((src: any) => (
                        <MenuItem value={src.id}>{src.user}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  value={language}
                  onChange={handleLanguageChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="all">All Languages</MenuItem>
                  <MenuItem value={"hi"}>Hindi</MenuItem>
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"ta"}>Tamil</MenuItem>
                  <MenuItem value={"te"}>Telugu</MenuItem>
                  <MenuItem value={"bn"}>Bengali</MenuItem>
                  <MenuItem value={"mr"}>Marathi</MenuItem>
                  <MenuItem value={"gu"}>Gujrati</MenuItem>
                  <MenuItem value={"tz"}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="date"
                type="date"
                label="Create Start Date"
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
                id="date"
                type="date"
                label="Create End Date"
                variant="outlined"
                value={end_date}
                onChange={handleAppointmentDateEnd}
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "90%", maxWidth: "440.89px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="form-elements">
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
      <AdminPositiveCallsTable />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  calls_filter_data: state.AdminFilterReducer.calls_filter_data,
});

export default connect(mapStateToProps, {
  getCallFilterData,
  getFilteredPositiveCalls,
})(AdminPositiveCallFilter);
