import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginActionHandler } from "../../redux-store/actions/auth-actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "../commons/loading-spinner";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    loginData: {
      username: "",
      password: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
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
