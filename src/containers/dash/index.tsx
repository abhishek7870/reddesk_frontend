import React, { useEffect } from "react";
import { checkUser } from "../../actions/loginActions";
import { connect } from "react-redux";
import CheckRoles from "./checkRoles";
import Loader from "../../newcomponents/loader";

interface Props {
  checkUser: Function;
  user: any;
  loading: any;
}

const Dash: React.FC<Props> = ({ checkUser, user, loading }) => {
  useEffect(() => {
    console.log("check user useeffect");
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user.user ? (
        <CheckRoles role={user.user.user_group} />
      ) : (
        <div style={{ width: "32px", height: "32px" }}>
          <Loader />{" "}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.loginReducer.user,
  loading: state.loginReducer.loading,
});
export default connect(mapStateToProps, { checkUser })(Dash);
