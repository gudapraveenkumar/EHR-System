import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  addTask,
  updateTask,
  deleteTask
} from "../../redux-store/actions/task-actions";
import { connect } from "react-redux";
import taskHttpCalls from "../../http-services/task-services";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "react-bootstrap/Spinner";
import "./task-modal.scss";

class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        description: "",
        priority_id: 1,
        status_id: 1,
        start: new Date(),
        end: new Date()
      },
      taskPriorities: [],
      taskStatuses: [],
      apiInProgress: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getTaskDetailsHandler = async () => {
    let apiInProgress = { ...this.state.apiInProgress };
    apiInProgress = true;
    this.setState({ apiInProgress });
    const response = await taskHttpCalls.fetchTaskById(this.props.taskId);

    const taskDetails = {
      title: response.data.task.title,
      description: response.data.task.description,
      priority_id: response.data.task.priority.id,
      status_id: response.data.task.status.id,
      start: new Date(response.data.task.start),
      end: new Date(response.data.task.end)
    };
    let { data } = { ...this.state.data };
    data = taskDetails;
    apiInProgress = false;
    this.setState({ apiInProgress });
    this.setState({ data, apiInProgress });
  };

  async componentDidMount() {
    const { data: priorities } = await taskHttpCalls.fetchTaskPriorities();
    const { data: statuses } = await taskHttpCalls.fetchTaskStatuses();
    if (!this.props.isNewTask) {
      this.getTaskDetailsHandler();
    }
    this.setState({
      taskPriorities: priorities.tasks,
      taskStatuses: statuses.tasks
    });
  }

  abortController = new AbortController();

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    if (input.name === "priority_id" || input.name === "status_id") {
      data[input.name] = parseInt(input.value);
    } else {
      data[input.name] = input.value;
    }
    this.setState({ data });
  };

  handleDateChange = (date, key) => {
    const data = { ...this.state.data };
    data[key] = date;
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.isNewTask) {
      this.props.saveNewTask(this.state.data);
    } else {
      this.props.updateTask(this.state.data, this.props.taskId);
    }
    this.props.closeModal();
  };

  handleDeleteTask = () => {
    this.props.deleteTask(this.props.taskId);
    this.props.closeModal();
  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          onHide={this.props.closeModal}
          show={this.props.openModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.isNewTask ? (
                <span>New Task</span>
              ) : (
                <span>Task Details</span>
              )}
              {(this.props.taskContainer.apiInProgress ||
                this.state.apiInProgress) && (
                <Spinner className="loader" animation="border" />
              )}
            </Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>
              <Form.Group controlId="taskTitle">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.data.title}
                  name="title"
                  onChange={this.handleChange}
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group controlId="taskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.data.description}
                  rows="2"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="startDate">
                  <div>Start Date</div>
                  <DatePicker
                    minDate={new Date()}
                    selected={this.state.data.start}
                    onChange={e => this.handleDateChange(e, "start")}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="endDate">
                  <div>End Date</div>
                  <DatePicker
                    minDate={this.state.data.start}
                    selected={this.state.data.end}
                    onChange={e => this.handleDateChange(e, "end")}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    name="priority_id"
                    value={this.state.data.priority_id}
                  >
                    {this.state.taskPriorities.map(item => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    name="status_id"
                    value={this.state.data.status_id}
                  >
                    {this.state.taskStatuses.map(item => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row className="align-items-center">
                <Col className="d-flex justify-content-end d-flex align-items-center">
                  {this.props.isNewTask && (
                    <Button
                      className="action-btn"
                      variant="secondary"
                      onClick={this.closeTaskModel}
                    >
                      Close
                    </Button>
                  )}

                  {!this.props.isNewTask && (
                    <Button
                      className="action-btn"
                      variant="danger"
                      onClick={this.handleDeleteTask}
                    >
                      Delete
                    </Button>
                  )}
                  <Button variant="success" onClick={this.handleSubmit}>
                    {this.props.isNewTask && <span>Save</span>}
                    {!this.props.isNewTask && <span>Update</span>}
                  </Button>
                </Col>
              </Form.Row>
            </Modal.Body>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveNewTask: taskData => dispatch(addTask(taskData)),
    updateTask: (taskData, taskId) => dispatch(updateTask(taskData, taskId)),
    deleteTask: taskId => dispatch(deleteTask(taskId))
  };
};

const mapStateToProps = state => {
  return {
    taskContainer: state.task
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal);
