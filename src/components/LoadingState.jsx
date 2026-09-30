import React from "react";

export default function LoadingState() {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <span>Loading tickets...</span>
    </div>
  );
}