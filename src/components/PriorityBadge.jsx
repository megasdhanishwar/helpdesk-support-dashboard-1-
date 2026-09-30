import React from "react";

export default function PriorityBadge({ value }) {
  const key = value.toLowerCase();
  return <span className={`badge priority-${key}`}>{value}</span>;
}