import React from "react";

export default function ChartCard({ title, subtitle, children }) {
  return (
    <section className="panel chart-card">
      <div className="panel-head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
