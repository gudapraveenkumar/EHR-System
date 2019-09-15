import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./dashboard-cards.scss";

const DashboardCard = props => {
  return (
    <Card>
      <Card.Body className="card-container">
        <Row>
          <Col md="auto" className="d-flex align-items-center">
            <FontAwesomeIcon className="card-icon" icon={props.icon} />
          </Col>
          <Col>
            <div className="d-flex justify-content-end">{props.title}</div>
            <div className="task-count" className="d-flex justify-content-end">
              {props.count}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
