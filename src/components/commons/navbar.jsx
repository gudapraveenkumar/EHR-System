import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/task-manager-logo.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewTaskModal from "../task/new-task-dialog";
import Row from "react-bootstrap/Row";

class AppNavBar extends Component {
  state = {
    showNewTaskModal: false
  };

  newTaskHandler = () => {
    let showNewTaskModal = { ...this.state };
    showNewTaskModal = true;
    this.setState({ showNewTaskModal });
  };

  closeNewTaskModal = () => {
    let showNewTaskModal = { ...this.state };
    showNewTaskModal = false;
    this.setState({ showNewTaskModal });
  };

  render() {
    const userLogin = this.props.authObj.userLogin;
    let newTaskModel = <div></div>;
    if (this.state.showNewTaskModal) {
      newTaskModel = (
        <NewTaskModal
          show={this.state.showNewTaskModal}
          onHide={this.closeNewTaskModal}
        />
      );
    }
    return (
      <div>
        <Navbar
          bg="light"
          className="bg-light justify-content-between"
          variant="light"
        >
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span style={{ marginLeft: "15px" }}>Task Manager</span>
          </Navbar.Brand>

          {userLogin && (
            <Row>
              <div
                className="text-primary"
                onClick={this.newTaskHandler}
                style={{ cursor: "pointer", marginRight: "15px" }}
              >
                New Task
              </div>
              {/* <Link style={{textTransform:'capitalize', marginRight: '15px'}} to="/profile">{userObj.username}</Link> */}
              <Link style={{ marginRight: "15px" }} to="/logout">
                Logout
              </Link>
            </Row>
          )}
        </Navbar>
        {newTaskModel}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(AppNavBar);
