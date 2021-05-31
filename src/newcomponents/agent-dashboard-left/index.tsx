import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./index.sass";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout, setProfile } from "../../actions/loginActions";
import { connect } from "react-redux";
import { isEmpty } from "../../helpers/isEmpty";
import PanelSelect from "./panelSelect";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";

interface Props {
  logout: Function;
  setProfile: Function;
  user: any;
  profile: any;
}

const AgentDashboardLeft: React.FC<Props> = ({
  logout,
  user,
  setProfile,
  profile,
}) => {
  let history = useHistory();
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (!user.user) {
      history.push("/dashboard");
    } else {
      setProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="main-left">
      <div className="header">
        <Link to="/dashboard">
          <HomeIcon />
          <h1>CRYSTA CRM</h1>
        </Link>
        <MenuIcon className="hamburger" onClick={() => setOpen(!open)} />
      </div>
      <div className={open ? "agent-report active" : "agent-report closed"}>
        <div className="agent">
          <p className="agent-name">
            {!isEmpty(profile) ? profile.profile.username : ""}
          </p>
          <p className="agent-time">
            Last login: <span>28/01/2021 11:45am</span>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "-30px",
            }}
          >
            <p className="agent-status">
              Online{" "}
              <FiberManualRecordIcon
                style={{ color: "green", marginLeft: "5px", fontSize: "16px" }}
              />
            </p>
            <p className="agent-status" onClick={() => logout()}>
              Logout{" "}
              <ExitToAppIcon
                style={{ color: "red", marginLeft: "5px", fontSize: "16px" }}
              />
            </p>
          </div>
        </div>
        {user.user && <PanelSelect />}
      </div>
      {/* <div className="logout">
        <button onClick={() => logout()}>
          Logout <ExitToAppIcon />{" "}
        </button>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.loginReducer.user,
  profile: state.loginReducer.profile,
});

export default connect(mapStateToProps, { logout, setProfile })(
  AgentDashboardLeft
);
