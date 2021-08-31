import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const SignedInLinks = (props) => {
  return (
    <>
      <Button color="inherit">
        <Link href="/profile" color="inherit">
          Profile
        </Link>
      </Button>

      <Button color="inherit" onClick={props.logOut}>
        Log Out
      </Button>

      <NavLink to="/" className="btn btn-floating pink lighten-1">
        SY
      </NavLink>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
