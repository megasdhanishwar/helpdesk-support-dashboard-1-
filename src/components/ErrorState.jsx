import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="empty-state error-state">
      <div className="empty-icon"><AlertTriangle size={25} /></div>
      <h3>Something went wrong</h3>
      <p>We could not load this section. Please try again.</p>
      <button className="btn btn-primary" onClick={onRetry}>Try Again</button>
    </div>
  );
}