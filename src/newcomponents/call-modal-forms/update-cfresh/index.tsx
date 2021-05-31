import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getCitiesDropdown } from "../../../actions/dropdownActions";
import { setCFreshComments } from "../../../actions/commentActions";
import { isEmpty } from "../../../helpers/isEmpty";

interface Props {
  getCitiesDropdown: Function;
  setCFreshComments: Function;

  loading: boolean;
  cities: any;
  patient_data: any;
  setOpen: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UpdateCFresh: React.FC<Props> = ({
  loading,
  setOpen,
  getCitiesDropdown,
  setCFreshComments,
  cities,
  patient_data,
}) => {
  let query = useQuery();
  let history = useHistory();
  const [call_type, setCallType] = React.useState<string>("none");
  const [city, setTreatmentCity] = React.useState<number>(0);
  const [language, setLanguage] = React.useState<string>("all");
  const [treatment, setTreatment] = React.useState<string>("");
  const [comment, setComment] = React.useState<string>("");
  const [isError, setIsError] = React.useState<boolean>(false);
  const [other_comment, setOtherComment] = React.useState<string>(
    "Sperm Donor"
  );
  const [other_other_comment, setOtherOtherComment] = React.useState<string>(
    ""
  );

  const handleCallTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCallType(event.target.value as string);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };

  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as string);
  };
  const handleCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setComment(event.target.value as string);
  };
  const handleOtherCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherComment(event.target.value as string);
  };
  const handleOtherOtherCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOtherOtherComment(event.target.value as string);
  };

  useEffect(() => {
    getCitiesDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (e: any) => {
    e.preventDefault();
    let lead_comment = query.get("id")
      ? query.get("id")
      : patient_data.results[0].id;
    if (call_type === "fertility") {
      let body = {
        category: 6,
        sub_category: call_type,
        lead_comment,
      };
      await setCFreshComments(body);
      history.push("/dashboard/ce/patient/fill-info");
    } else if (call_type === "other") {
      if (city === 0) {
        setIsError(true);
      } else {
        let body = {
          category: 6,
          sub_category: call_type,
          lead_comment,
          comment: `${other_comment} ${other_other_comment}`,
        };
        await setCFreshComments(body);
        history.push("/dashboard");
        setIsError(false);
      }
    } else if (call_type === "non_fertility") {
      if (city === 0) {
        setIsError(true);
      } else {
        let body = {
          category: 6,
          sub_category: call_type,
          lead_comment,
          city,
          language,
          treatment,
          comment,
        };
        await setCFreshComments(body);
        history.push("/dashboard");
        setIsError(false);
      }
    } else {
      let body = {
        category: 6,
        sub_category: call_type,
        lead_comment,
        city,
        language,
        treatment,
        comment,
      };
      await setCFreshComments(body);
      history.push("/dashboard");
    }
  };
  return (
    <form className="modal-form">
      <div className="modal-form-fields">
        <FormControl variant="outlined" required>
          <Select
            id="demo-simple-select-required"
            value={call_type}
            onChange={handleCallTypeChange}
            style={{ width: "100%", maxWidth: "440.89px" }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"none"}>Call Type</MenuItem>
            <MenuItem value={"ringing"}>Ringing</MenuItem>
            <MenuItem value={"switch_off"}>Switch Off</MenuItem>
            <MenuItem value={"cut_call"}>Cut-Call</MenuItem>
            <MenuItem value={"invalid_no"}>Invalid Number</MenuItem>
            <MenuItem value={"fertility"}>Fertility</MenuItem>
            <MenuItem value={"non_fertility"}>Non-Fertility</MenuItem>
            <MenuItem value={"other"}>Others</MenuItem>
          </Select>
        </FormControl>
      </div>
      {call_type === "non_fertility" ? (
        <>
          <div className="modal-form-fields" style={{ margin: "7px" }}>
            <FormControl variant="outlined" required>
              {!isEmpty(cities) && cities.results.length > 0 ? (
                <Autocomplete
                  id="combo-box-demo"
                  // value={treatment_city}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      let obj = JSON.parse(JSON.stringify(newValue, null, " "));

                      setTreatmentCity(obj.id);
                    }
                  }}
                  options={cities.results}
                  freeSolo
                  getOptionLabel={(option: any) => option.display_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={isError}
                      variant="outlined"
                      placeholder="City"
                      style={{ width: "90%", maxWidth: "440.89px" }}
                    />
                  )}
                />
              ) : (
                <TextField variant="outlined" />
              )}
            </FormControl>
          </div>
          <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={language}
                onChange={handleLanguageChange}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"all"}>Language</MenuItem>
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
          <div className="modal-form-fields" style={{ marginBottom: "7px" }}>
            <FormControl variant="outlined" required>
              <TextField
                variant="outlined"
                value={treatment}
                onChange={handleTreatmentChange}
                placeholder="Treatment"
              />
            </FormControl>
          </div>
          <div className="modal-form-fields">
            <FormControl variant="outlined" required>
              <TextField
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Commment"
              />
            </FormControl>
          </div>
        </>
      ) : null}
      {call_type === "other" ? (
        <>
          <div className="modal-form-fields" style={{ marginTop: "7px" }}>
            <FormControl variant="outlined" required>
              {!isEmpty(cities) && cities.results.length > 0 ? (
                <Autocomplete
                  id="combo-box-demo"
                  // value={treatment_city}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      let obj = JSON.parse(JSON.stringify(newValue, null, " "));

                      setTreatmentCity(obj.id);
                    }
                  }}
                  options={cities.results}
                  freeSolo
                  getOptionLabel={(option: any) => option.display_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={isError}
                      placeholder="City"
                      style={{ width: "90%", maxWidth: "440.89px" }}
                    />
                  )}
                />
              ) : (
                <TextField variant="outlined" />
              )}
            </FormControl>
          </div>
          <div className="modal-form-fields" style={{ margin: "7px" }}>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={other_comment}
                onChange={handleOtherCommentChange}
                style={{ width: "100%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Sperm Donor"}>Sperm Donor</MenuItem>
                <MenuItem value={"Test Call"}>Test Call</MenuItem>
                <MenuItem value={"Surrogate Mother"}>Surrogate Mother</MenuItem>
                <MenuItem value={"Job Enquiry"}>Job Enquiry</MenuItem>
                <MenuItem value={"Doctor Number"}>Doctor Number</MenuItem>
                <MenuItem value={"Marketing Team"}>Marketing Team</MenuItem>
                <MenuItem value={"Social Media Number"}>
                  Social Media Number
                </MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </div>
        </>
      ) : null}
      {other_comment === "Others" ? (
        <div className="modal-form-fields">
          <FormControl variant="outlined" required>
            <TextField
              variant="outlined"
              value={other_other_comment}
              onChange={handleOtherOtherCommentChange}
              placeholder="Commment"
            />
          </FormControl>
        </div>
      ) : null}
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
  cities: state.dropdownReducer.cities,
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps, {
  getCitiesDropdown,
  setCFreshComments,
})(UpdateCFresh);
