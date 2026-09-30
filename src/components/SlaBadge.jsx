import React from "react";
import { Clock3 } from "lucide-react";

export default function SlaBadge({ hours }) {
  const urgent = hours < 24;
  return (
    <span className={`sla-badge ${urgent ? "sla-urgent" : ""}`}>
      <Clock3 size={13} />
      {hours >= 100 ? "On track" : `${hours}h left`}
    </span>
  );
}