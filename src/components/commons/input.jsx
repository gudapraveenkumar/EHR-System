import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({ name, label, placeholder, error, ...rest }) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label className="text-capitalize">{label}</Form.Label>
      <Form.Control
        isInvalid={error}
        {...rest}
        name={name}
        placeholder={placeholder}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Input;
