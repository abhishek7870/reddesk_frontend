import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "../Hoc/MainLayout";
import Login from "../containers/login";
import SecureStorage from "./SecureStorage";
import { checkUser } from "../actions/loginActions";

//ubaid
import Agent from "../containers/agent-dashboard";
import UpdatePatientInfo from "../containers/update-patient-info";
import FillPatientInfo from "../containers/fill-patient-info";
import Appointments from "../containers/appointments";
import CreateAppointment from "../containers/create-appointment";
import PositiveCalls from "../containers/positive-calls";
import SnackBar from "../components/SnackBar";
import EditCallDetails from "../containers/edit-call-details";
import EditAppointmentDetails from "../containers/edit-appointment-details";
import { connect } from "react-redux";
import Dash from "../containers/dash";
import FbAgentDash from "../containers/fb-agent";
import AdminAgentDash from "../containers/admin-agent";
import SearchResults from "../containers/search-results";
import CallFilter from "../newcomponents/panels/admin-panel/filters/call-filters";
import AdminPositiveCallFilter from "../newcomponents/panels/admin-panel/filters/positive-call-filters";
import AdminAppointmentFilter from "../newcomponents/panels/admin-panel/filters/appointment-filters";
import AdminFBUpload from "../newcomponents/panels/admin-panel/uploader/fb";
import AdminLeadTransfer from "../newcomponents/panels/admin-panel/lead-transfer/by-comma";
import AdminLeadTransferByCity from "../newcomponents/panels/admin-panel/lead-transfer/by-city";
import AdminRejectCalls from "../newcomponents/panels/admin-panel/reject-calls";
import AdminEditAppointmentDetails from "../newcomponents/panels/admin-panel/edit/appointmentEdit";
import AdminOperatorTransfer from "../newcomponents/panels/admin-panel/operator-transfer";
import PccAgentDash from "../containers/pcc-agent";
import PccAppointmentFilter from "../newcomponents/panels/pcc-panel/filters/appointment-filters";
import PccConversionFilter from "../newcomponents/panels/pcc-panel/filters/conversion-filters";
import PccAppointmentFeedbackFilter from "../newcomponents/panels/pcc-panel/filters/appointment-feedback-filters";
import firebase from "../firebase";

function Routes() {
  useEffect(() => {
    console.log("check user");
    checkUser();
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.log("firebasetoken", data);
      })
      .catch(() => {
        console.log("error form firebase request permission");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <MainLayout>
        <SnackBar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
              if (SecureStorage.getItem("token")) {
                return (
                  <Switch>
                    <Route path="/dashboard" exact component={Dash} />
                    <Route path="/dashboard/ce" exact component={Agent} />
                    <Route path="/dashboard/ad" exact component={FbAgentDash} />
                    {/* <Route path="/dashboard/pcc"  exact component={PccAgentDash} /> */}

                    <Route
                      path="/dashboard/admin"
                      exact={false}
                      component={() => {
                        return (
                          <Switch>
                            <AdminAgentDash>
                              <Route
                                path="/dashboard/admin/calls"
                                exact
                                component={CallFilter}
                              />
                              <Route
                                path="/dashboard/admin/positive-calls"
                                exact
                                component={AdminPositiveCallFilter}
                              />
                              <Route
                                path="/dashboard/admin/appointments"
                                exact
                                component={AdminAppointmentFilter}
                              />
                              <Route
                                path="/dashboard/admin/upload/fb"
                                exact
                                component={AdminFBUpload}
                              />
                              <Route
                                path="/dashboard/admin/call-transfer"
                                exact
                                component={AdminLeadTransfer}
                              />
                              <Route
                                path="/dashboard/admin/call-transfer/by-city"
                                exact
                                component={AdminLeadTransferByCity}
                              />
                              <Route
                                path="/dashboard/admin/reject-calls"
                                exact
                                component={AdminRejectCalls}
                              />
                              <Route
                                path="/dashboard/admin/patient/edit-appointment-details"
                                exact
                                component={AdminEditAppointmentDetails}
                              />
                              <Route
                                path="/dashboard/admin/operator-transfer"
                                exact
                                component={AdminOperatorTransfer}
                              />
                            </AdminAgentDash>
                          </Switch>
                        );
                      }}
                    />

                    <Route
                      path="/dashboard/ad/patient/update-info"
                      component={UpdatePatientInfo}
                    />
                    <Route
                      path="/dashboard/ce/patient/fill-info"
                      component={FillPatientInfo}
                    />
                    <Route
                      path="/dashboard/ce/patient/appointments"
                      component={Appointments}
                    />
                    <Route
                      path="/dashboard/ce/patient/create-appointment"
                      component={CreateAppointment}
                    />
                    <Route
                      path="/dashboard/ce/patient/positive-calls"
                      component={PositiveCalls}
                    />
                    <Route
                      path="/dashboard/ce/patient/edit-call-details"
                      component={EditCallDetails}
                    />
                    <Route
                      path="/dashboard/ce/patient/edit-appointment-details"
                      component={EditAppointmentDetails}
                    />
                    <Route
                      path="/dashboard/ce/patient/search-results"
                      component={SearchResults}
                    />
                    <Route
                        path="/dashboard/pcc"
                        exact={false}
                        component={() =>{
                          return (
                            <Switch>
                              <PccAgentDash>
                                <Route path="/dashboard/pcc/appointments"
                                   exact 
                                    component={PccAppointmentFilter}
                                />
                                <Route path="/dashboard/pcc/app-feedback"
                                     exact
                                      component={PccAppointmentFeedbackFilter}
                                />
                                <Route path="/dashboard/pcc/conversion"
                                   exact
                                    component={PccConversionFilter} 
                                />
                              </PccAgentDash>
                            </Switch>
                          )
                        }

                        } 
                    >

                    </Route>
                  </Switch>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </MainLayout>
    </HashRouter>
  );
}

export default connect(null, { checkUser })(Routes);
