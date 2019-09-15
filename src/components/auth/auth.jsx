import React, { Component } from "react";
import Login from "./login";
import Registration from "./registration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import "./auth.scss";

class Auth extends Component {
  state = {
    isLogin: true
  };

  toggleAuth = () => {
    let isLogin = { ...this.state };
    isLogin = !this.state.isLogin;
    this.setState({ isLogin });
  };

  render() {
    let authContent;
    if (this.state.isLogin) {
      authContent = (
        <React.Fragment>
          <Login />
          <div className="text-center">
            Don't have an account{" "}
            <Button onClick={this.toggleAuth} variant="link">
              Register
            </Button>
          </div>
        </React.Fragment>
      );
    } else {
      authContent = (
        <React.Fragment>
          <Registration />
          <div className="text-center">
            Already have an account{" "}
            <Button onClick={this.toggleAuth} variant="link">
              Login
            </Button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Row className="auth-container d-flex justify-content-center align-items-center">
          <Col className="debba align-self-center" xs={10} sm={8} md={5}>
            <h3 className="text-center">
              <FontAwesomeIcon className="header-icon" icon="tasks" />
              ERH System
            </h3>
            {authContent}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Auth;
