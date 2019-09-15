import React, { Component } from "react";
import TaskModal from "./task-modal";
import "./task-card.scss";

class TaskCard extends Component {
  state = {
    showTaskDetailsModal: false,
    selectedTask: {}
  };

  taskDetailsHandler = task => {
    this.setState({ showTaskDetailsModal: true, selectedTask: task });
  };

  closeTaskDetailsModalHandler = () => {
    this.setState({ showTaskDetailsModal: false, selectedTask: {} });
  };

  render() {
    const task = this.props.task;
    const chipClassName =
      task.priority.name === "Low"
        ? "low"
        : task.priority.name === "Medium"
        ? "medium"
        : "high";
    return (
      <React.Fragment>
        {this.state.showTaskDetailsModal && (
          <TaskModal
            taskId={this.state.selectedTask.id}
            isNewTask={false}
            closeModal={this.closeTaskDetailsModalHandler}
            openModal={this.state.showTaskDetailsModal}
          />
        )}

        <div
          className="task-card"
          draggable
          onClick={() => this.taskDetailsHandler(task)}
          onDragStart={e => this.props.onDragStart(task)}
        >
          {task.title}
          <div className={chipClassName}>{task.priority.name}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskCard;
