import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Modal: React.FC<{children: ReactNode, closeModal: () => void}> = (props) => {
  const portalElement = document.getElementById("overlays");

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <div className={`${classes.modal} ${classes.modal_size}`}>
          <div>{props.children}</div>
        </div>,
        portalElement!
      )}
    </Fragment>
  );
};

export default Modal;
