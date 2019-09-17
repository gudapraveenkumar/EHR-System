import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import { loginActionHandler } from "../../redux-store/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "../commons/loading-spinner";
import { toast } from "react-toastify";
import AppForm from "../commons/form";

class Login extends AppForm {
  state = {
    loginData: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  handleInputChange = ({ currentTarget: input }) => {
    const loginData = { ...this.state.loginData };
    loginData[input.name] = input.value;
    this.setState({ loginData });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const data = { ...this.state.loginData };
    if (data.username && data.password) {
      this.props.onLogin(this.state.loginData);
    } else {
      toast.warn("Please enter details");
    }
  };

  render() {
    if (this.props.authContainer.isUserLogin) {
      return <Redirect to="/dashboard" />;
    }
    const { username, password } = this.state.loginData;
    const { isApiInProgress } = this.props.authContainer;

    return (
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={this.handleLoginSubmit}>
            {this.renderInput("username", "Enter Username")}

            {/* <Form.Group controlId="loginForm">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                label={}
                value={username}
                name="username"
                onChange={this.handleInputChange}
                placeholder="Enter username"
              />
            </Form.Group> */}

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={this.handleInputChange}
                placeholder="Enter Password"
              />
            </Form.Group>

            <div className="text-right">
              <Button variant="link">Forgot Password</Button>
              <Button
                type="submit"
                disabled={isApiInProgress}
                variant="primary"
              >
                {isApiInProgress && <LoadingSpinner />}
                {!isApiInProgress && <span>Login</span>}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(loginActionHandler(authData))
  };
};

const mapStateToProps = state => {
  return { authContainer: state.auth };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
