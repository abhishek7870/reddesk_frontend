import React, { useEffect } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import {
  leadTransferByCityFields,
  leadTransferByCity,
} from "../../../../../actions/admin-agent/leadTransferActions";
import { isEmpty } from "../../../../../helpers/isEmpty";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "50%",
    background: "#F7F7F7",
    margin: "10px 0",
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: "50%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, cityName: string[], theme: Theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  leadTransferByCityFields: Function;
  leadTransferByCity: Function;
  lead_transfer_by_city_fields: any;
  loading: boolean;
}

const AdminLeadTransferByCity: React.FC<Props> = ({
  leadTransferByCityFields,
  lead_transfer_by_city_fields,
  leadTransferByCity,
  loading,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [treatment_city, setTreatmentCity] = React.useState<number>(0);
  const [nationality, setNationality] = React.useState<string>("national");
  const [status, setCallStatus] = React.useState<string>("");
  const [treatment, setTreatment] = React.useState<string>("");
  const [from_user, setFromuser] = React.useState<string>("");
  const [to_user, setTouser] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("hi");
  const [calls, setCalls] = React.useState<number>(0);
  const [priority, setPriority] = React.useState<string[]>([
    "Urgent",
    "Critical",
    "High",
  ]);
  const priorities = [
    { name: "Urgent", value: "Urgent" },
    { name: "Critical", value: "Critical" },
    { name: "High", value: "High" },
    { name: "Hopefull", value: "Hopefull" },
  ];

  useEffect(() => {
    leadTransferByCityFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNationalityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setNationality(event.target.value as string);
  };
  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCallStatus(event.target.value as string);
  };
  const handleTreatmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatment(event.target.value as string);
  };
  const handleFromuserChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFromuser(event.target.value as string);
  };
  const handlePriorityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPriority(event.target.value as string[]);
  };
  const handleTouserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTouser(event.target.value as string);
  };
  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };
  const handleCallChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCalls(event.target.value as number);
  };

  const submitForm = async () => {
    let body = {
      country: nationality,
      callstatus: status,
      city: treatment_city,
      treatment,
      from_user,
      to_user,
      priority,
      noofcall: calls,
    };

    await leadTransferByCity(body);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="header-collapse">Patient Details </div>
        <form className="form-fields info">
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Nationality</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={nationality}
                  onChange={handleNationalityChange}
                >
                  <MenuItem value={"inter"}>International</MenuItem>
                  <MenuItem value={"national"}>National</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Call Status</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={status}
                  onChange={handleStatusChange}
                >
                  {!isEmpty(lead_transfer_by_city_fields) &&
                  lead_transfer_by_city_fields.callstatus.length > 0
                    ? lead_transfer_by_city_fields.callstatus.map(
                        (status: any) => (
                          <MenuItem value={status.id}>{status.name}</MenuItem>
                        )
                      )
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>City</p>
              <FormControl variant="outlined" required>
                {!isEmpty(lead_transfer_by_city_fields) &&
                lead_transfer_by_city_fields.city.length > 0 ? (
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
                    options={lead_transfer_by_city_fields.city}
                    freeSolo
                    getOptionLabel={(option: any) => option.display_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        style={{ width: "100%" }}
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
              <p>Treatment</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={treatment}
                  onChange={handleTreatmentChange}
                >
                  {!isEmpty(lead_transfer_by_city_fields) &&
                  lead_transfer_by_city_fields.treatment.length > 0
                    ? lead_transfer_by_city_fields.treatment.map(
                        (treat: any) => (
                          <MenuItem value={treat.id}>{treat.name}</MenuItem>
                        )
                      )
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>From user</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={from_user}
                  onChange={handleFromuserChange}
                >
                  {!isEmpty(lead_transfer_by_city_fields) &&
                  lead_transfer_by_city_fields.paneluser.length > 0
                    ? lead_transfer_by_city_fields.paneluser.map(
                        (user: any) => (
                          <MenuItem value={user.id}>{user.user}</MenuItem>
                        )
                      )
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Language</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={language}
                  onChange={handleLanguageChange}
                >
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
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>Priority</p>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={priority}
                  onChange={handlePriorityChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={undefined}
                  MenuProps={MenuProps}
                >
                  {priorities.map((item: any) => (
                    <MenuItem
                      key={item.value}
                      value={item.value}
                      style={getStyles(item.name, priority, theme)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>To user</p>
              <FormControl variant="outlined" required>
                <Select
                  id="demo-simple-select-required"
                  style={{ width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={to_user}
                  onChange={handleTouserChange}
                >
                  {!isEmpty(lead_transfer_by_city_fields) &&
                  lead_transfer_by_city_fields.paneluser.length > 0
                    ? lead_transfer_by_city_fields.paneluser.map(
                        (user: any) => (
                          <MenuItem value={user.id}>{user.user}</MenuItem>
                        )
                      )
                    : null}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-elements" style={{ display: "flex" }}>
            <div>
              <p>No. of call</p>
              <input
                style={{ width: "100%" }}
                type="text"
                className="other-text"
                value={calls}
                onChange={handleCallChange}
              />
            </div>
          </div>
        </form>
        <CardActions style={{ padding: "8px 0" }}>
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
          >
            <p>
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size={24} />
              ) : (
                "Submit"
              )}
            </p>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  lead_transfer_by_city_fields:
    state.leadTransferReducer.lead_transfer_by_city_fields,
  loading: state.leadTransferReducer.loading,
});

export default connect(mapStateToProps, {
  leadTransferByCityFields,
  leadTransferByCity,
})(AdminLeadTransferByCity);
