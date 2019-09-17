import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { signupActionHandler } from "../../redux-store/actions/auth-actions";
import { connect } from "react-redux";
import LoadingSpinner from "../commons/loading-spinner";
import AppForm from "../commons/form";

class Registration extends AppForm {
  state = {
    data: {
      username: "",
      password: "",
      email: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    email: Joi.string()
      .email()
      .required()
      .label("Email")
  };

  doSubmit = e => {
    console.log("DEBBA ", this.state.data);
    // this.props.onRegister(this.state.signupData);
  };

  render() {
    if (this.props.authContainer.isUserSignup) {
      return <Redirect to="/auth" />;
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title className="text-center"> Register</Card.Title>

          <Form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Enter email")}
            {this.renderInput("username", "Enter Username")}
            {this.renderInput("password", "Enter password", "password")}

            <div className="text-right">
              <Button
                type="submit"
                disabled={this.props.authContainer.isApiInProgress}
                variant="primary"
              >
                {this.props.authContainer.isApiInProgress && <LoadingSpinner />}
                {!this.props.authContainer.isApiInProgress && (
                  <span>Register</span>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    onRegister: (signupData, ownProps) =>
      dispatch(signupActionHandler(signupData))
  };
};

const mapStateToProps = state => {
  return { authContainer: state.auth };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Registration);
