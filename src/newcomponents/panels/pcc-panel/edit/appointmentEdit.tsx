import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppointmentInformation from "../../../forms/edit-appointment-details-forms/appointment-information";
import CallDetails from "../../../forms/edit-appointment-details-forms/call-details";
import { readAppointment } from "../../../../actions/appointmentActions";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  readAppointment: Function;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PccEditAppointmentDetails: React.FC<Props> = ({ readAppointment }) => {
  let history = useHistory();
  let query = useQuery();

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

  return (
    <div className="main-info-forms">
      <CallDetails />
      <AppointmentInformation />
    </div>
  );
};

export default connect(null, { readAppointment })(PccEditAppointmentDetails);
