import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { getCallsFilterData } from "../../../actions/dropdownActions";
import { setFilterTwo } from "../../../actions/filterActions";
import { isEmpty } from "../../../helpers/isEmpty";
import { generatePositiveCallsUrl } from "../../../helpers/generateUrl";
import { useLocation } from "react-router-dom";

interface Props {
  getCallsFilterData: Function;
  setFilterTwo: Function;
  calls_filter_data: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SecondFilterHeader: React.FC<Props> = ({
  getCallsFilterData,
  calls_filter_data,
  setFilterTwo,
}) => {
  let query = useQuery();
  const [city, setCity] = React.useState<number>(0);
  const [sources, setSources] = React.useState<string>("all");
  const [treatment, setTreatment] = React.useState<number>(0);

  const [agent, setAgent] = React.useState<number>(0);
  const [appt_Date_start, setApptDateStart] = React.useState<string>("");
  const [appt_Date_end, setApptDateEnd] = React.useState<string>("");

  const handleSourcesChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSources(event.target.value as string);
  };
  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as number);
  };

  const handleAgentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAgent(event.target.value as number);
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

  // useEffect(() => {
  //   getCallsFilterData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const submitForm = () => {
    let body = {
      followup_date_start: appt_Date_start,
      followup_date_end: appt_Date_end,
      treatment,
      panel_user: agent,
      city,
      lead_source: sources,
      day: query.get("day"),
    };

    setFilterTwo(generatePositiveCallsUrl(body));
  };

  return (
    <div className="filter-header">
      <form className="form-fields info">
        <div className="form-elements" style={{ display: "flex" }}>
          <div>
            <FormControl variant="outlined" required>
              {!isEmpty(calls_filter_data) &&
              calls_filter_data.cities.length > 0 ? (
                <Autocomplete
                  id="free-solo-demo"
                  // value={city}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      let obj = JSON.parse(JSON.stringify(newValue, null, " "));

                      setCity(obj.id);
                    } else {
                      setCity(0);
                    }
                  }}
                  freeSolo
                  options={calls_filter_data.cities}
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
                value={sources}
                onChange={handleSourcesChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="all">All Sources</MenuItem>
                {!isEmpty(calls_filter_data) &&
                calls_filter_data.source.length > 0
                  ? calls_filter_data.source.map((source: any) => (
                      <MenuItem value={source.uuid}>{source.name}</MenuItem>
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
                calls_filter_data.agent.length > 0
                  ? calls_filter_data.agent.map((agent: any) => (
                      <MenuItem value={agent.id}>{agent.user}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              id="date"
              type="date"
              label="Create Start Date"
              value={appt_Date_start}
              disabled={
                query.get("day") === "today" ||
                query.get("day") === "tomorrow" ||
                query.get("day") === "week"
              }
              variant="outlined"
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
              label="Create End Date"
              disabled={
                query.get("day") === "today" ||
                query.get("day") === "tomorrow" ||
                query.get("day") === "week"
              }
              value={appt_Date_end}
              onChange={handleAppointmentDateEnd}
              variant="outlined"
              inputProps={{ "aria-label": "Without label" }}
              style={{ width: "90%", maxWidth: "440.89px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="form-elements">
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
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  calls_filter_data: state.dropdownReducer.calls_filter_data,
});

export default connect(mapStateToProps, { getCallsFilterData, setFilterTwo })(
  SecondFilterHeader
);
