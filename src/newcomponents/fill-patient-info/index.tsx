import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MedicalHistory from "../forms/fill-info-forms/medical-history";
import OtherDetails from "../forms/fill-info-forms/other-details";
import Relevent from "../forms/fill-info-forms/relevant";
import TreatmentInfo from "../forms/fill-info-forms/treatment-info";
import { connect } from "react-redux";
import CallOptions from "../agent-dashboard-right/call-options";

interface Props {
  patient_data: any;
  read_call_details: any;
}

// custom hook for query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FillPatientInfoMain: React.FC<Props> = ({
  patient_data,
  read_call_details,
}) => {
  let query = useQuery();
  let history = useHistory();
  const [id, setId] = React.useState<number>(0);
  const [data, setData] = React.useState<object>({});
  useEffect(() => {
    if (query.get("id")) {
      setId(parseInt(query.get("id")!));
      setData(read_call_details.lead);
    } else {
      if (
        Object.keys(patient_data).length === 0 &&
        patient_data.constructor === Object
      ) {
        history.push("/agent/dashboard");
      } else {
        setId(patient_data.results[0].id);
        setData(patient_data.results[0]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient_data, data]);
  return (
    <div className="main-right">
      <CallOptions />
      <div className="main-info-forms">
        <TreatmentInfo id={id} data={data} />
        <Relevent id={id} data={data} />
        <MedicalHistory id={id} data={data} />
        <OtherDetails id={id} data={data} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  patient_data: state.dashboardReducer.patient_data,
  read_call_details: state.positiveCallsReducer.read_call_details,
});
export default connect(mapStateToProps)(FillPatientInfoMain);
