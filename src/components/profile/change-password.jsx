import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./change-password.scss";

class ChangePassword extends Component {
  state = {
    data: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  };

  render() {
    return (
      <div className="change-password-container">
        <Row className="change-password-body justify-content-center align-items-center">
          <Col md={6}>
            <Card>
              <Card.Header>Update Password</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Current Password"
                    />
                  </Form.Group>

                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New Password"
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </Form.Group>

                  <Row className="justify-content-end">
                    <Button type="submit" variant="success">
                      Save
                    </Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChangePassword;
