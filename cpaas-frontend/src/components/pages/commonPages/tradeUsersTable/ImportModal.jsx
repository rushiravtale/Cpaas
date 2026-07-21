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
        alert("Please select a valid Excel file (.xlsx or .xls)");
        return;
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        alert("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setErrors([]);
      setResult(null);
    }
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a file to import");
      return;
    }

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
              <div className="file-input-display">
                {file ? file.name : "Choose Excel file (.xlsx, .xls)"}
              </div>
            </label>
            {file && (
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
              <h5>Import Errors ({errors.length})</h5>
              <div className="errors-table-container">
                <table className="errors-table">
                  <thead>
                    <tr>
                      <th>Row</th>
                      <th>Field</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((error, index) => (
                      <tr key={index}>
                        <td>{error.row}</td>
                        <td>{error.field}</td>
                        <td>{error.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            disabled={!file || importingAgniveers}
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
