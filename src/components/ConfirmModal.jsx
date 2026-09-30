import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ open, title, text, confirmText = "Confirm", onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onCancel} aria-label="Close"><X size={18} /></button>
        <div className="modal-icon"><AlertTriangle size={21} /></div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}