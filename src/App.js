import React, { Component } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./helper/font-awesome-icons";

import TaskList from "./components/task/task-list";
import ProtectedRoute from "./components/commons/protectedRoute";
import Logout from "./components/commons/logout";
import { checkUserLogin } from "./redux-store/actions/auth-actions";
import AppSideNav from "./components/sidenav/side-nav";
import MyCalendar from "./components/calendar/my-calendar";
import Dashboard from "./components/dashboard/dashboard";
import ChangePassword from "./components/profile/change-password";
import Auth from "./components/auth/auth";

class App extends Component {
  componentDidMount() {
    this.props.checkUserLogin();
  }

  render() {
    return (
      <div className="app-container">
        <Row className="layout-row">
          {this.props.authContainer.userLogin && (
            <Col className="app-side-nav" md="2.7">
              <AppSideNav />
            </Col>
          )}

          <Col className="app-content">
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/task-list" component={TaskList} />
              <ProtectedRoute path="/my-calendar" component={MyCalendar} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <ProtectedRoute
                path="/change-password"
                component={ChangePassword}
              />
              <Route path="/" exact component={Auth} />
            </Switch>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authContainer: state.auth };
};

export default connect(
  mapStateToProps,
  { checkUserLogin }
)(App);
