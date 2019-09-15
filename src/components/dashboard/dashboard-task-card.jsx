import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./dashboard-task-card.scss";
import Moment from "react-moment";

const DashboardTaskCard = ({ task, openTask }) => {
  const chipClassName =
    task.priority.id === 1 ? "low" : task.priority.id === 2 ? "medium" : "high";
  const labelClassName =
    task.status.id === 1
      ? "backlog"
      : task.status.id === 2
      ? "in-progress"
      : "completed";

  return (
    <div onClick={openTask} className="task-card-container">
      <Row>
        <Col>
          <div>{task.title}</div>
          <div className="description">{task.description}</div>
        </Col>
        <Col md="auto" className="d-flex align-items-center">
          <div className={labelClassName}>{task.status.name}</div>
        </Col>
        <Col className="d-flex flex-row justify-content-center align-items-center">
          <div className="text-center date">
            End Date: <Moment format="YYYY-MM-DD">{task.end}</Moment>
          </div>
        </Col>
        <Col md="auto" className="d-flex align-items-center">
          <div className={chipClassName}>{task.priority.name}</div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardTaskCard;
