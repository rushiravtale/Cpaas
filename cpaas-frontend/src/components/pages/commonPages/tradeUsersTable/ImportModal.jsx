import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ButtonControl from "../../../controls/button/ButtonControl";
import { importAgniveers } from "../../../../store/tradeUsers/tradeUserActions";
import "./importModalStyles.scss";

const ImportModal = ({
  show,
  onClose,
  importAgniveers,
  importingAgniveers,
  tradeId,
}) => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [result, setResult] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  if (!show) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError("Please select a valid Excel file (.xlsx or .xls)");
        setFile(null);
        return;
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setFileError("File size must be less than 10MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setFileError("");
      setErrors([]);
      setResult(null);
    }
  };

  const handleImport = () => {
    if (!file) {
      setFileError("Please select an Excel file (.xlsx or .xls) to import");
      return;
    }
    setFileError("");

    importAgniveers(file, tradeId, (response) => {
      if (response?.errors) {
        setErrors(response.errors);
        setResult(response.errorData?.results || null);
      } else if (response) {
        setResult(response);
        setErrors([]);
        // Refresh the page data after successful import
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const handleClose = () => {
    setFile(null);
    setErrors([]);
    setResult(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className="import-modal-overlay" onClick={handleClose}>
      <div className="import-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="import-modal-header">
          <h4>Import Agniveers from Excel</h4>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="import-modal-body">
          <div className="file-upload-section">
            <label className="file-label">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className={`file-input-display ${fileError ? "file-input-error" : ""}`}>
                {file ? file.name : "Choose Excel file (.xlsx, .xls)"}
              </div>
            </label>
            {fileError && (
              <div className="file-error-message">
                ⚠ {fileError}
              </div>
            )}
            {file && !fileError && (
              <div className="file-info">
                <span>File: {file.name}</span>
                <span>Size: {(file.size / 1024).toFixed(2)} KB</span>
              </div>
            )}
          </div>

          {importingAgniveers && (
            <div className="loading-section">
              <p>Importing agniveers, please wait...</p>
            </div>
          )}

          {result && !errors.length && (
            <div className="success-section">
              <h5>Import Successful!</h5>
              <div className="result-summary">
                <p>Total Rows: {result.total || 0}</p>
                <p>Created: {result.created || 0}</p>
                <p>Updated: {result.updated || 0}</p>
              </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="errors-section">
              <div className="errors-header">
                <span className="errors-icon">⚠</span>
                <h5>
                  Import Failed — {errors.length} error{errors.length !== 1 ? "s" : ""} found. Fix and re-import.
                </h5>
              </div>
              <div className="error-groups-container">
                {Object.values(
                  errors.reduce((acc, err) => {
                    const key = err.row;
                    if (!acc[key]) acc[key] = { row: err.row, data: err.data, errors: [] };
                    acc[key].errors.push(err);
                    return acc;
                  }, {})
                ).map((group) => {
                  const isFileError = group.row === "-";
                  const armyNo = !isFileError && Array.isArray(group.data)
                    ? (group.data[4] ?? "").toString().trim()
                    : "";
                  const noId = !isFileError && !armyNo;
                  const groupClass = isFileError
                    ? "error-row-group error-row-group--file"
                    : noId
                    ? "error-row-group error-row-group--no-id"
                    : "error-row-group";
                  return (
                    <div key={group.row} className={groupClass}>
                      <div className="error-row-header">
                        {isFileError ? (
                          <span className="error-row-badge error-row-badge--file">File Error</span>
                        ) : (
                          <span className="error-row-badge">Row {group.row}</span>
                        )}
                        {!isFileError && (noId ? (
                          <span className="error-soldier-unknown">
                            Army No missing — soldier cannot be identified
                          </span>
                        ) : (
                          <span className="error-soldier-id">
                            Army No: <strong>{armyNo}</strong>
                          </span>
                        ))}
                      </div>
                      <ul className="error-row-details">
                        {group.errors.map((err, i) => (
                          <li key={i}>
                            <span className="error-field-tag">{err.field}</span>
                            <span className="error-msg-text">{err.message}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {result && (
                <div className="result-summary">
                  <p>Created: {result.created || 0}</p>
                  <p>Updated: {result.updated || 0}</p>
                  <p>Failed: {result.failed || 0}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="import-modal-footer">
          <ButtonControl
            text="Cancel"
            onClick={handleClose}
            styles="modal-cancel-btn"
            disabled={importingAgniveers}
          />
          <ButtonControl
            text={importingAgniveers ? "Importing..." : "Import"}
            onClick={handleImport}
            styles="modal-confirm-btn"
            disabled={importingAgniveers}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  importingAgniveers: state.tradeUsers?.importingAgniveers || false,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      importAgniveers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);
