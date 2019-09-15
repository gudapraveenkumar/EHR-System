import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks, updateTask } from "../../redux-store/actions/task-actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./task-list.scss";
import TaskCard from "./task-card";
import NewTaskBtn from "../commons/new-task-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TaskList extends Component {
  state = {
    selectedTask: {}
  };

  componentDidMount() {
    this.props.getTasks();
  }

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = task => {
    let selectedTask = { ...this.state.selectedTask };
    selectedTask = task;
    this.setState({ selectedTask });
  };

  onDrop = status => {
    let task = { ...this.state.selectedTask };
    if (task.status.id !== status) {
      task.status_id = status;
      this.props.updateTask(task, task.id);
    }
  };

  render() {
    let tasks = {
      Backlog: [],
      InProgress: [],
      Completed: []
    };
    this.props.taskContainer.tasks.forEach(item => {
      tasks[item.status.name].push(item);
    });

    return (
      <div>
        <Row
          className="d-flex align-items-center"
          style={{ margin: "15px 0px" }}
        >
          <Col>
            <h4>My Tasks</h4>
          </Col>
          <Col md="auto">
            <NewTaskBtn />
          </Col>
        </Row>

        <Row>
          <Col
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(1)}
          >
            <div className="task-columns">
              <h5>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon="clipboard-list"
                />
                Backlog
              </h5>
              {tasks.Backlog.map(el => {
                return (
                  <TaskCard
                    key={el.id}
                    task={el}
                    onDragStart={this.onDragStart}
                  />
                );
              })}
            </div>
          </Col>

          <Col
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(2)}
          >
            <div className="task-columns">
              <h5>
                {" "}
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon="briefcase"
                />{" "}
                In Progress
              </h5>
              {tasks.InProgress.map(el => {
                return (
                  <TaskCard
                    key={el.id}
                    task={el}
                    onDragStart={this.onDragStart}
                  />
                );
              })}
            </div>
          </Col>

          <Col
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(3)}
          >
            <div className="task-columns">
              <h5>
                <FontAwesomeIcon style={{ marginRight: "10px" }} icon="check" />
                Completed
              </h5>
              {tasks.Completed.map(el => {
                return (
                  <TaskCard
                    key={el.id}
                    task={el}
                    onDragStart={this.onDragStart}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
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

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks()),
    updateTask: (taskData, taskId) => dispatch(updateTask(taskData, taskId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
