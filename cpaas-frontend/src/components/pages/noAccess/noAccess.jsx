




import React from "react";
import { Link } from "react-router-dom";

export default function NoAccess() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#444",
        fontSize: "0.9rem",
      }}
    >
      <div>
        <div style={{ fontSize: "1.2rem", marginBottom: "8px" }}>⚠ No Access</div>
        <p style={{ margin: "0 0 12px 0", opacity: 0.7 }}>
          You don't have permission to view this page.
        </p>

        <Link
          to="/dashboard"
          style={{
            fontSize: "0.85rem",
            padding: "6px 14px",
            borderRadius: "6px",
            background: "#4d5225",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
