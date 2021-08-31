import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li>
          <Button to="/signup">Signup</Button>
        </li>
        <li>
          <Button to="/signin">Login</Button>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
