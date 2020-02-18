import React from "react";

import { Alert } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  variant:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | undefined;
}

export const AlertFeedback: React.FC<Props> = ({
  children,
  setShow,
  show,
  variant
}) => {
  return show ? (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {children}
    </Alert>
  ) : (
    <div></div>
  );
};

export default AlertFeedback;
