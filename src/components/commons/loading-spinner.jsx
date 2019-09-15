import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = props => {
  return (
    <span>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </span>
  );
};

export default LoadingSpinner;
