import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AdminRecordingTable from "../../tables/recordings";
import { getAllRecordings } from "../../../../../actions/admin-agent/tableActions";

interface Props {
  getAllRecordings: Function;
}

const RecordingFilter: React.FC<Props> = ({ getAllRecordings }) => {
  const [agent, setAgent] = React.useState<number>(0);

  const handleAgentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAgent(event.target.value as number);
  };

  const submitForm = () => {
    let url = agent !== 0 ? `?panel_user=${agent}` : "";
    getAllRecordings(url);
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
                  value={agent}
                  onChange={handleAgentChange}
                  style={{ width: "90%", maxWidth: "440.89px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>All Agents</MenuItem>
                </Select>
              </FormControl>
            </div>
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
                onClick={submitForm}
              >
                Filter
              </Button>
            </div>
          </div>
        </form>
      </div>
      <AdminRecordingTable />
    </>
  );
};

export default connect(null, { getAllRecordings })(RecordingFilter);
