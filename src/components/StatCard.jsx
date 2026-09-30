import React from "react";

export default function StatCard({ label, value, note, icon: Icon, tone = "blue" }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <p>{label}</p>
          <h2>{value}</h2>
        </div>
        <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      </div>
      <span className="stat-note">{note}</span>
    </div>
  );
}