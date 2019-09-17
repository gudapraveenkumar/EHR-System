import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import { loginActionHandler } from "../../redux-store/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "../commons/loading-spinner";
import AppForm from "../commons/form";

class Login extends AppForm {
  state = {
    data: {
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

  doSubmit = e => {
    this.props.onLogin(this.state.data);
  };

  render() {
    if (this.props.authContainer.isUserLogin) {
      return <Redirect to="/dashboard" />;
    }

    const { isApiInProgress } = this.props.authContainer;

    return (
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Enter Username")}
            {this.renderInput("password", "Enter Password", "password")}

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
