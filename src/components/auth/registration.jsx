import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import { signupActionHandler } from "../../redux-store/actions/auth-actions";
import { connect } from "react-redux";
import LoadingSpinner from "../commons/loading-spinner";
import { toast } from "react-toastify";

class Registration extends Component {
  state = {
    signupData: {
      username: "",
      password: "",
      email: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const signupData = { ...this.state.signupData };
    signupData[input.name] = input.value;
    this.setState({ signupData });
  };

  handleRegisterSubmit = e => {
    e.preventDefault();
    const data = { ...this.state.signupData };
    if (data.username && data.password && data.email) {
      this.props.onRegister(this.state.signupData, this.props);
    } else {
      toast.warn("Please enter details");
    }
  };

  render() {
    if (this.props.authContainer.userSignup) {
      return <Redirect to="/auth" />;
    }

    const { email, username, password } = this.state.signupData;
    return (
      <Card>
        <Card.Body>
          <Card.Title className="text-center"> Register</Card.Title>
          <Form onSubmit={this.handleRegisterSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                value={email}
                name="email"
                onChange={this.handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="username"
                onChange={this.handleChange}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={this.handleChange}
                placeholder="Enter Password"
              />
            </Form.Group>

            <div className="text-right">
              <Button
                type="submit"
                disabled={this.props.authContainer.apiInProgress}
                variant="primary"
              >
                {this.props.authContainer.apiInProgress && <LoadingSpinner />}
                {!this.props.authContainer.apiInProgress && (
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
      dispatch(signupActionHandler(signupData, ownProps))
  };
};

const mapStateToProps = state => {
  return { authContainer: state.auth };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Registration);
