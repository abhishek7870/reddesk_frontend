import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { relevantDetails } from "../../../../actions/patientInfoActions";
import { getCitiesDropdown } from "../../../../actions/dropdownActions";
import { isEmpty } from "../../../../helpers/isEmpty";
import { Validation } from "../../../../helpers/noValidator";

import "./index.sass";

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
});

interface Props {
  relevantDetails: Function;
  getCitiesDropdown: Function;
  cities: any;
  id: number;
  loading_form_2: boolean;
  data: any;
}

const Relevent: React.FC<Props> = ({
  relevantDetails,
  id,
  getCitiesDropdown,
  cities,
  loading_form_2,
  data,
}) => {
  const classes = useStyles();
  const [toggleForm, setToggleForm] = React.useState<boolean>(true);
  const [searchingFor, setSearchingFor] = React.useState<string | null>("self");
  const [patient_name, setPatientName] = React.useState<string>("");
  const [primary_contact, setPrimaryContact] = React.useState<number>();
  const [husband_name, setHusbandName] = React.useState<string>("");
  const [husband_age, setHusbandAge] = React.useState<number>(0);
  const [wife_age, setWifeAge] = React.useState<number>(0);
  const [wife_name, setWifeName] = React.useState<string>("");
  const [loan_required, setLoanRequired] = React.useState<string>("no");
  const [income, setIncome] = React.useState<string>("business");
  const [marriage_duration, setMarriageDuration] = React.useState<number>(0);
  const [patient_city, setPatientCity] = React.useState<number | null>(null);
  const [patient_area, setPatientArea] = React.useState<string>(
    !isEmpty(data) ? data.patient_area : ""
  );
  const [patient_state, setPatientState] = React.useState<string>("");
  const [treatment_city, setTreatmentCity] = React.useState<number>(0);
  const [budget, setBudget] = React.useState<number>(
    !isEmpty(data) ? data.budget : 0
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchingFor(event.target.value as string);
  };
  const handleLoanChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLoanRequired(event.target.value as string);
  };
  const handleIncomeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIncome(event.target.value as string);
  };

  useEffect(() => {
    getCitiesDropdown();
    setHusbandName(data.husband_name);
    setHusbandAge(data.husband_age);
    setWifeName(data.wife_name);
    setWifeAge(data.wife_age);
    setMarriageDuration(data.marriage_duration);
    setPatientArea(data.patient_area);
    setBudget(data.budget);
    setLoanRequired(data.loan_required);
    setIncome(data.patient_classType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const submitForm = async () => {
    let body = {
      primary_name: patient_name,
      primary_contact,
      husband_name,
      husband_age,
      wife_age,
      wife_name,
      loan_required,
      patient_classType: income,
      marriage_duration,
      patient_city,
      patient_area,
      treatment_city,
      budget,
    };
    console.log(body);
    await relevantDetails(body, id);
    setToggleForm(false);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <div
          className="header-collapse"
          onClick={() => setToggleForm(!toggleForm)}
        >
          Relevant{" "}
          {!toggleForm ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <form
          className="form-fields info"
          style={{ display: !toggleForm ? "none" : "block" }}
        >
          <div className="form-elements">
            <p>Searching for</p>
            <FormControl variant="outlined" required>
              <Select
                id="demo-simple-select-required"
                value={searchingFor}
                onChange={handleChange}
                style={{ width: "90%", maxWidth: "440.89px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"self"}>Self</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          {searchingFor === "other" ? (
            <div className="form-elements" style={{ display: "flex" }}>
              <div>
                <p>Patient name</p>
                <input
                  style={{ width: "90%" }}
                  type="text"
                  className="other-text"
                  value={patient_name}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                    setPatientName(e.target.value as string)
                  }
                />
              </div>
              <div>
                <p>Contact number</p>
                <input
                  style={{ width: "90%" }}
                  type="text"
                  className="other-text"
                  value={primary_contact}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    if (Validation(e.target.value)) {
                      setPrimaryContact(e.target.value as number);
                    }
                  }}
                />
              </div>
              <div>
                <p>Treatment State</p>
                <input
                  style={{ width: "90%" }}
                  type="text"
                  className="other-text"
                  value={patient_state}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                    setPatientState(e.target.value as string)
                  }
                />
              </div>
              <div>
                <p>Treatment city</p>
                <FormControl variant="outlined" required>
                  {!isEmpty(cities) && cities.results.length > 0 ? (
                    <Autocomplete
                      id="combo-box-demo"
                      // value={treatment_city}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          let obj = JSON.parse(
                            JSON.stringify(newValue, null, " ")
                          );

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
                          style={{ width: "90%", maxWidth: "440.89px" }}
                        />
                      )}
                    />
                  ) : (
                    <TextField variant="outlined" />
                  )}
                </FormControl>
              </div>
            </div>
          ) : (
            <>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Husband name</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={husband_name}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                      setHusbandName(e.target.value as string)
                    }
                  />
                </div>
                <div>
                  <p>Husband Age</p>
                  <input
                    style={{ width: "94%" }}
                    type="text"
                    className="other-text"
                    value={husband_age}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      if (Validation(e.target.value)) {
                        setHusbandAge(e.target.value as number);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Wife name</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={wife_name}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                      setWifeName(e.target.value as string)
                    }
                  />
                </div>
                <div>
                  <p>Wife age</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={wife_age}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      if (Validation(e.target.value)) {
                        setWifeAge(e.target.value as number);
                      }
                    }}
                  />
                </div>
                <div>
                  <p>Mariage duration</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={marriage_duration}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      if (Validation(e.target.value)) {
                        setMarriageDuration(e.target.value as number);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Patient city</p>
                  <FormControl variant="outlined" required>
                    {!isEmpty(cities) && cities.results.length > 0 ? (
                      <Autocomplete
                        id="combo-box-demo"
                        // value={patient_city}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            let obj = JSON.parse(
                              JSON.stringify(newValue, null, " ")
                            );

                            setPatientCity(obj.id);
                          }
                        }}
                        options={cities.results}
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
                  <p>Patient area</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={patient_area}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                      setPatientArea(e.target.value as string)
                    }
                  />
                </div>
                <div>
                  <p>Treatment city</p>
                  <FormControl variant="outlined" required>
                    {!isEmpty(cities) && cities.results.length > 0 ? (
                      <Autocomplete
                        id="combo-box-demo"
                        // value={treatment_city}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            let obj = JSON.parse(
                              JSON.stringify(newValue, null, " ")
                            );

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
                            style={{ width: "90%", maxWidth: "440.89px" }}
                          />
                        )}
                      />
                    ) : (
                      <TextField variant="outlined" />
                    )}
                  </FormControl>
                </div>
              </div>
              <div className="form-elements" style={{ display: "flex" }}>
                <div>
                  <p>Budget</p>
                  <input
                    style={{ width: "90%" }}
                    type="text"
                    className="other-text"
                    value={budget}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      if (Validation(e.target.value)) {
                        setBudget(e.target.value as number);
                      }
                    }}
                  />
                </div>
                <div>
                  <p>Loan Required</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={loan_required}
                      onChange={handleLoanChange}
                      style={{ width: "90%" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"yes"}>Yes</MenuItem>
                      <MenuItem value={"no"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p>Income (Business/Salary)</p>
                  <FormControl variant="outlined" required>
                    <Select
                      id="demo-simple-select-required"
                      value={income}
                      onChange={handleIncomeChange}
                      style={{ width: "90%" }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"business"}>Business</MenuItem>
                      <MenuItem value={"job"}>Salary</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </>
          )}
        </form>
      </CardContent>
      <CardActions
        style={{ paddingLeft: "16px", display: !toggleForm ? "none" : "block" }}
      >
        <Button
          style={{
            background: "#924A91",
            color: "#fff",
            paddingTop: "0",
            paddingBottom: "0",
            width: "100%",
          }}
          size="large"
          onClick={submitForm}
          disabled={loading_form_2}
        >
          <p>
            {loading_form_2 ? (
              <CircularProgress style={{ color: "#fff" }} size={24} />
            ) : (
              "Submit"
            )}
          </p>
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  cities: state.dropdownReducer.cities,
  loading_form_2: state.patientInfoReducer.loading_form_2,
});

export default connect(mapStateToProps, { relevantDetails, getCitiesDropdown })(
  Relevent
);
