import React, { Component } from "react";

import { logoutActionHandler } from "../../redux-store/actions/auth-actions";

import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutActionHandler();
    this.props.history.push("/auth");
  }

  render() {
    return <div></div>;
  }
}

export default connect(
  null,
  { logoutActionHandler }
)(Logout);
