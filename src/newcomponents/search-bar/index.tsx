import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchCall } from "../../actions/dashboardActions";
import "./index.sass";
import CallModal from "../call-modal";

interface Props {
  searchCall: Function;
  patient_data: any;
}

const SearchBar: React.FC<Props> = ({ searchCall, patient_data }) => {
  let history = useHistory();
  const [option, setOption] = React.useState<string>("phone_no");
  const [value, setValue] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [heading, setHeading] = React.useState<string>("");
  const [modelFormIndex, setModelFormIndex] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  const handleOpen = (name: string, index: number) => {
    setOpen(true);
    setHeading(name);
    setModelFormIndex(index);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    let body = {
      search_by: option,
      value,
    };
    searchCall(body);
    history.push("/dashboard/ce/patient/search-results");
  };

  return (
    <>
      <div className="call-options second">
        <button onClick={() => handleOpen("Create Call", 7)}>
          Create Call
        </button>
        {patient_data &&
        patient_data.count > 0 &&
        patient_data.results[0].call_status === "CFresh" ? (
          <button onClick={() => handleOpen("Update CFresh", 8)}>
            Update CFresh
          </button>
        ) : null}
        <button onClick={() => handleOpen("Add Alternate No.", 9)}>
          Add Alt. No.
        </button>
        <div className="search-box">
          <form onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Search Call..."
              value={value}
              onChange={handleValueChange}
            />
          </form>

          <div className="radio">
            <RadioGroup
              aria-label="option"
              value={option}
              onChange={handleChange}
            >
              <FormControlLabel
                value="phone_no"
                control={<Radio />}
                label="Phone No."
              />
              <FormControlLabel
                value="call_id"
                control={<Radio />}
                label="Call Id"
              />
              <FormControlLabel value="name" control={<Radio />} label="Name" />
            </RadioGroup>
          </div>
        </div>
      </div>
      <CallModal
        open={open}
        setOpen={setOpen}
        heading={heading}
        index={modelFormIndex}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
});

export default connect(mapStateToProps, { searchCall })(SearchBar);
