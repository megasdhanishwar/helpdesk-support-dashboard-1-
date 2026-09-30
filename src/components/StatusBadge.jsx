import React from "react";

export default function StatusBadge({ value }) {
  const key = value.toLowerCase().replace(/\s/g, "-");
  return <span className={`badge status-${key}`}><i />{value}</span>;
}