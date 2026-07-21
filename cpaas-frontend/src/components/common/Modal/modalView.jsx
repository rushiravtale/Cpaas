import React from "react";
import ButtonControl from "../../controls/button/ButtonControl";
import "./modalStyles.scss";

export default function ConfirmationModal({
  show = false,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm = () => {},
  onClose = () => {},
  hideHeader = false,
  hideFooter = false,
}) {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container">

        {!hideHeader && (
          <div className="custom-modal-header">
            <h4>{title}</h4>
          </div>
        )}

        <div className="custom-modal-body">
          {message}
        </div>

        {!hideFooter && (
          <div className="custom-modal-footer">
            <ButtonControl
              text={cancelLabel}
              onClick={onClose}
              styles="modal-cancel-btn"
            />

            <ButtonControl
              text={confirmLabel}
              onClick={onConfirm}
              styles="modal-confirm-btn"
            />
          </div>
        )}
      </div>
    </div>
  );
}
