import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getCenterList } from "../../../actions/dropdownActions";
import { setAgreeForAppointment } from "../../../actions/commentActions";
import { isEmpty } from "../../../helpers/isEmpty";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    // margin: 2,
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
  getCenterList: Function;

  setAgreeForAppointment: Function;
  center_list: any;
  loading: boolean;
  patient_data: any;
  redirect: boolean;
  setOpen: Function;
  loadingForm: boolean;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Appointments: React.FC<Props> = ({
  getCenterList,
  redirect,
  setAgreeForAppointment,
  center_list,
  loading,
  patient_data,
  setOpen,
  loadingForm,
}) => {
  const classes = useStyles();
  let query = useQuery();
  const theme = useTheme();
  let history = useHistory();

  useEffect(() => {
    getCenterList();
    // if (redirect) {
    //   history.push("/agent/dashboard/patient/create-appointment");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  const [centerName, setCenterName] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState<string>("");
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCenterName(event.target.value as string[]);
  };
  const handleCommentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setComment(event.target.value as string);
  };

  const submitForm = async () => {
    let lead = query.get("id") ? query.get("id") : patient_data.results[0].id;
    let body = {
      category: 4,
      comment,
      lead,
      suggested_center: centerName,
    };

    await setAgreeForAppointment(body);
    history.push("/dashboard/ce/patient/create-appointment");
  };

  return (
    <form className="modal-form" noValidate>
      <div className="modal-form-fields">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">
            Recommended Centers
          </InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={centerName}
            onChange={handleSelectChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={undefined}
            MenuProps={MenuProps}
          >
            {loading
              ? "Loading"
              : !isEmpty(center_list) && center_list.count > 0
              ? center_list.results.map((center: any) => (
                  <MenuItem
                    key={center.id}
                    value={center.id}
                    style={getStyles(center.name, centerName, theme)}
                  >
                    {center.name}
                  </MenuItem>
                ))
              : "No results"}
          </Select>
        </FormControl>
      </div>
      <div className="modal-form-fields">
        <TextField
          id="outlined-basic"
          placeholder="Other Comments"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="modal-form-fields">
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={submitForm}
          disabled={loadingForm}
        >
          {loadingForm ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  center_list: state.dropdownReducer.center_list,
  loading: state.dropdownReducer.loading,
  patient_data: state.dashboardReducer.patient_data,
  redirect: state.commentsReducer.redirect,
  loadingForm: state.commentsReducer.loading,
});

export default connect(mapStateToProps, {
  getCenterList,
  setAgreeForAppointment,
})(Appointments);
