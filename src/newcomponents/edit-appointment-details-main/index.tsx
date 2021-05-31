import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppointmentInformation from "../forms/edit-appointment-details-forms/appointment-information";
import CallDetails from "../forms/edit-appointment-details-forms/call-details";
import { readAppointment } from "../../actions/appointmentActions";
import { useHistory, useLocation } from "react-router-dom";
import { isEmpty } from "../../helpers/isEmpty";
import { clickToCall } from "../../actions/dashboardActions";
import CallOptions from "../agent-dashboard-right/call-options";

interface Props {
  readAppointment: Function;
  clickToCall: Function;
  read_appointment_data: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditAppointmentDetailsMain: React.FC<Props> = ({
  readAppointment,
  read_appointment_data,
  clickToCall,
}) => {
  let history = useHistory();
  let query = useQuery();

  const [showCallDialog, setShowCallDialog] = React.useState(false);

  useEffect(() => {
    if (!query.get("id")) {
      history.push("/dashboard");
    } else {
      let body = {
        lead: query.get("id"),
      };
      readAppointment(body);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: any, c_type: string) => {
    e.stopPropagation();
    setShowCallDialog(false);
    clickToCall(read_appointment_data.lead.id, c_type);
    setShowCallDialog(false);
  };

  return (
    <div className="main-right">
      <CallOptions />
      <div className="call-options" style={{ position: "relative" }}>
        <button
          onClick={() => setShowCallDialog(!showCallDialog)}
          style={{ backgroundColor: "rgba(146, 74, 145)" }}
        >
          Call
        </button>
        {!isEmpty(read_appointment_data) ? (
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
              <span className="bold">Lead</span>
            </li>
            {read_appointment_data.lead.primary_contact ? (
              <li onClick={(e) => handleClick(e, "primary")}>
                <span className="bold">Primary</span>
              </li>
            ) : null}
            {read_appointment_data.lead.secondary_contact ? (
              <li onClick={(e) => handleClick(e, "secondary")}>
                <span className="bold">Secondary</span>
              </li>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="main-info-forms">
        <CallDetails />
        <AppointmentInformation />
      </div>
      <div className="call-options" style={{ height: "40px" }}></div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  read_appointment_data: state.appointmentsReducer.read_appointment_data,
});

export default connect(mapStateToProps, { readAppointment, clickToCall })(
  EditAppointmentDetailsMain
);
