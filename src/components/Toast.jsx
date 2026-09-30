import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <CheckCircle2 size={18} />
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close"><X size={16} /></button>
    </div>
  );
}