import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import TrelloBoard from "./components/TrelloCard/TrelloBoard";
import Home from "./components/TrelloCard/Home";

import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import Profile from "./components/profile/Profile";
import Error from "./components/Error";
import { connect } from "react-redux";

function App({ loggedIn, emailVerified }) {
  let routes;
  console.log(loggedIn, emailVerified);
  if (loggedIn && !emailVerified) {
    console.log("test 1 ");
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/:boardID" component={TrelloBoard} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/profile" component={Profile} />
        <Route path="/*" exact={true}>
          <div style={{ height: "100vh" }}>
            <Error />
          </div>
        </Route>
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    console.log("test 2");
    routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={Home} />
        <Route path="/:boardID" component={TrelloBoard} />
        <Route path="/profile" component={Profile} />
        <Route path="/*" exact={true}>
          <div style={{ height: "100vh" }}>
            <Error />
          </div>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
    );
  }

  return <Router>{routes}</Router>;
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.firebase.auth.uid,
    emailVerified: state.firebase.auth.emailVerified,
  };
};

export default connect(mapStateToProps)(App);
