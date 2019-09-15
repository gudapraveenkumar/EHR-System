import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { getTasks } from "../../redux-store/actions/task-actions";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DashboardCard from "./dashboard-cards";

import "./dashboard.scss";
import DashboardTaskCard from "./dashboard-task-card";
import TaskModal from "../task/task-modal";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  state = {
    showTaskDetailsModal: false,
    selectedTask: {}
  };

  taskDetailsHandler = task => {
    this.setState({ showTaskDetailsModal: true, selectedTask: task });
  };

  closeTaskDetailsModal = () => {
    this.setState({ showTaskDetailsModal: false, selectedTask: {} });
  };

  render() {
    let tasks = this.props.taskContainer.tasks;

    return (
      <div className="dashboard-section">
        {this.state.showTaskDetailsModal && (
          <TaskModal
            taskId={this.state.selectedTask.id}
            isNewTask={false}
            closeModal={this.closeTaskDetailsModal}
            openModal={this.state.showTaskDetailsModal}
          />
        )}

        <Row className="d-flex align-items-center">
          <Col>
            <DashboardCard
              title="Today's Tasks"
              icon={["far", "calendar"]}
              count="11"
            />
          </Col>
          <Col>
            <DashboardCard
              title="Backlog Tasks"
              icon="clipboard-list"
              count="05"
            />
          </Col>
          <Col>
            <DashboardCard
              title="Tasks InProgress"
              icon="briefcase"
              count="12"
            />
          </Col>
          <Col>
            <Card>
              <Card.Body className="overview-priority-tasks">
                <div className="priority-task-count">
                  <div className="low">Low</div>
                  <div>12</div>
                </div>

                <div className="priority-task-count">
                  <div className="medium">Medium</div>
                  <div>12</div>
                </div>

                <div className="priority-task-count">
                  <div className="high">High</div>
                  <div>12</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="dashboard-section">
          <Card.Header as="h5">Today's Tasks</Card.Header>
          <Card.Body>
            {tasks.map(item => {
              if (item.status.id === 1) {
                return (
                  <div key={item.id}>
                    <DashboardTaskCard
                      openTask={() => this.taskDetailsHandler(item)}
                      task={item}
                    />
                  </div>
                );
              }
              return "";
            })}
          </Card.Body>
        </Card>
        <Card className="dashboard-section">
          <Card.Header as="h5">Upcoming Tasks</Card.Header>
          <Card.Body>
            {tasks.map(item => {
              if (item.status.id === 2) {
                return (
                  <div key={item.id}>
                    <DashboardTaskCard
                      openTask={() => this.taskDetailsHandler(item)}
                      task={item}
                    />
                  </div>
                );
              }
              return "";
            })}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskContainer: state.task,
    message: state.toastMessage
  };
}

export default connect(
  mapStateToProps,
  { getTasks }
)(Dashboard);
