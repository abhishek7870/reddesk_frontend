import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import CommentHistory from "../forms/edit-call-details-forms/comment-history";
import CallDetails from "../forms/edit-call-details-forms/call-details";
import PatientBasic from "../forms/edit-call-details-forms/patient-basic";
import PatientMedicalHistory from "../forms/edit-call-details-forms/patient-medical-history";
import { readCallDetails } from "../../actions/positiveCallsActions";
import { isEmpty } from "../../helpers/isEmpty";
import { clickToCall, searchCall } from "../../actions/dashboardActions";
import { searchCall as searchCallAdmin } from "../../actions/admin-agent/tableActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CallModal from "../call-modal";
import "./index.sass";
import CallOptions from "../agent-dashboard-right/call-options";
interface Props {
  readCallDetails: Function;
  clickToCall: Function;
  read_call_details: any;
  user: any;
  profile: any;
  loading: boolean;
  searchCall: Function;
  searchCallAdmin: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditCallDetailsMain: React.FC<Props> = ({
  readCallDetails,
  read_call_details,
  searchCallAdmin,
  searchCall,
  clickToCall,
  loading,
  user,
  profile,
}) => {
  let query = useQuery();
  let history = useHistory();

  const [showCallDialog, setShowCallDialog] = React.useState(false);
  const [option, setOption] = React.useState<string>("phone_no");
  const [value, setValue] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [heading, setHeading] = React.useState<string>("");
  const [modelFormIndex, setModelFormIndex] = React.useState<number>(0);

  useEffect(() => {
    if (query.get("id")) {
      let callId = query.get("id");
      readCallDetails(callId);
    } else {
      history.push("/dashboard/ce");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: any, c_type: string) => {
    e.stopPropagation();
    setShowCallDialog(false);
    clickToCall(read_call_details.lead.id, c_type);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    let body = {
      search_by: option,
      value,
    };
    if (user.user.user_group === "ADMIN") {
      searchCallAdmin(body);
      console.log("admin");
    } else {
      searchCall(body);
      console.log("none");
    }

    history.push("/dashboard/ce/patient/search-results");
  };

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

  return (
    <>
      <div className="main-right">
        <CallOptions />
        <div className="call-options second" style={{ position: "relative" }}>
          <button
            onClick={() => setShowCallDialog(!showCallDialog)}
            disabled={loading}
            style={{ backgroundColor: "rgba(146, 74, 145)" }}
          >
            Call
          </button>
          <Link
            to={`/dashboard/ce/patient/create-appointment?id=${query.get(
              "id"
            )}`}
          >
            <button style={{ backgroundColor: "#D0AA3F" }}>Create</button>
          </Link>
          <Link to={`/dashboard/ce/patient/fill-info?id=${query.get("id")}`}>
            <button style={{ backgroundColor: "#D0AA3F" }}>Update</button>
          </Link>
          <button onClick={() => handleOpen("Add Alternate No.", 9)}>
            Add Alt. No.
          </button>
          {!isEmpty(read_call_details) &&
          read_call_details.lead.call_status === "CFresh" ? (
            <button onClick={() => handleOpen("Update CFresh", 8)}>
              Update CFresh
            </button>
          ) : null}
          {!isEmpty(read_call_details) ? (
            <div
              className="dropdown1"
              style={{
                top: showCallDialog ? "90%" : "-990%",
                left: "2%",
                padding: 0,
                color: "#924A91",
              }}
            >
              <li onClick={(e) => handleClick(e, "lead")}>
                <span className="bold call-no">
                  <span>Lead:</span>

                  <span>
                    {profile.profile.is_mobile
                      ? read_call_details.lead.call
                      : "XXXXXXXXXX"}
                  </span>
                </span>
              </li>
              {read_call_details.lead.primary_contact ? (
                <li onClick={(e) => handleClick(e, "primary")}>
                  <span className="bold call-no">
                    Primary:
                    <span>
                      {profile.profile.is_mobile
                        ? read_call_details.lead.primary_contact
                        : "XXXXXXXXXX"}
                    </span>
                  </span>
                </li>
              ) : null}
              {read_call_details.lead.secondary_contact ? (
                <li onClick={(e) => handleClick(e, "secondary")}>
                  <span className="bold call-no" style={{ fontSize: "14px" }}>
                    Secondary:
                    <span>
                      {profile.profile.is_mobile
                        ? read_call_details.lead.primary_contact
                        : "XXXXXXXXXX"}
                    </span>
                  </span>
                </li>
              ) : null}
            </div>
          ) : null}
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
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Name"
                />
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="main-info-forms">
          <PatientBasic />
          <PatientMedicalHistory />
          <CallDetails />
          <CommentHistory />
        </div>
        <div className="call-options" style={{ height: "40px" }}></div>
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
  read_call_details: state.positiveCallsReducer.read_call_details,
  loading: state.positiveCallsReducer.loading,
  user: state.loginReducer.user,
  profile: state.loginReducer.profile,
});

export default connect(mapStateToProps, {
  readCallDetails,
  clickToCall,
  searchCallAdmin,
  searchCall,
})(EditCallDetailsMain);
