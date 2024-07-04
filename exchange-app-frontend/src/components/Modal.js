import React from "react";

const Modal = ({ title, children, hasAction, actionName, action }) => {
  return (
    <div className="modal" id="simpleModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{children}</div>
          {hasAction && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={action}>
                {actionName}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
