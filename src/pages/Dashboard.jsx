import React, { useMemo } from "react";
import { Activity, AlertCircle, CheckCircle2, Clock3, Plus, Ticket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import SlaBadge from "../components/SlaBadge";
import ChartCard from "../components/ChartCard";

export default function Dashboard({ tickets }) {
  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    progress: tickets.filter((t) => t.status === "In Progress").length,
    resolved: tickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length,
    urgent: tickets.filter((t) => t.priority === "Urgent").length,
    breached: tickets.filter((t) => t.sla < 24 && !["Resolved", "Closed"].includes(t.status)).length
  }), [tickets]);

  const statusData = ["Open", "In Progress", "Pending", "Resolved", "Closed"].map((status) => ({
    status,
    value: tickets.filter((t) => t.status === status).length
  }));
  const maxStatus = Math.max(1, ...statusData.map((item) => item.value));

  const categoryData = ["Technical", "Billing", "Account", "Product", "General"].map((category) => ({
    category,
    value: tickets.filter((t) => t.category === category).length
  }));
  const maxCategory = Math.max(1, ...categoryData.map((item) => item.value));

  const recent = tickets.slice(0, 5);

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <h2>Good afternoon, Arun</h2>
          <p>Here is what is happening with your support tickets today.</p>
        </div>
        <Link to="/tickets/new" className="btn btn-primary"><Plus size={17} /> Create Ticket</Link>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Tickets" value={stats.total} note="All support requests" icon={Ticket} tone="blue" />
        <StatCard label="Open Tickets" value={stats.open} note="Need attention" icon={AlertCircle} tone="orange" />
        <StatCard label="In Progress" value={stats.progress} note="Currently being handled" icon={Activity} tone="purple" />
        <StatCard label="Resolved" value={stats.resolved} note="Completed requests" icon={CheckCircle2} tone="green" />
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Urgent Tickets</span><strong>{stats.urgent}</strong><PriorityBadge value="Urgent" /></div>
        <div className="mini-stat"><span>At Risk SLA</span><strong>{stats.breached}</strong><SlaBadge hours={12} /></div>
        <div className="mini-stat"><span>Avg. Response</span><strong>1.8h</strong><span className="positive"><TrendingUp size={14} /> 12% faster</span></div>
        <div className="mini-stat"><span>Open Queue</span><strong>{stats.open + stats.progress}</strong><span className="muted">Active tickets</span></div>
      </div>

      <div className="chart-grid">
        <ChartCard title="Tickets by Status" subtitle="Current ticket distribution">
          <div className="bar-chart">
            {statusData.map((item) => (
              <div className="bar-item" key={item.status}>
                <div className="bar-value">{item.value}</div>
                <div className="bar-track"><div className="bar-fill" style={{ height: `${Math.max(8, (item.value / maxStatus) * 100)}%` }} /></div>
                <span>{item.status}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Tickets by Category" subtitle="Where requests are coming from">
          <div className="category-list">
            {categoryData.map((item) => (
              <div className="category-row" key={item.category}>
                <div className="category-label"><span>{item.category}</span><strong>{item.value}</strong></div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${(item.value / maxCategory) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Recent Tickets</h3>
            <p>Latest customer support activity</p>
          </div>
          <Link to="/tickets" className="text-link">View all</Link>
        </div>
        <div className="recent-list">
          {recent.map((ticket) => (
            <Link to={`/tickets/${ticket.id}`} className="recent-item" key={ticket.id}>
              <div className="recent-main">
                <span className="ticket-id">{ticket.id}</span>
                <strong>{ticket.subject}</strong>
                <small>{ticket.requester} · {ticket.category}</small>
              </div>
              <div className="recent-meta">
                <PriorityBadge value={ticket.priority} />
                <StatusBadge value={ticket.status} />
                <SlaBadge hours={ticket.sla} />
              </div>
            </Link>
          ))}
          {!recent.length && <div className="empty-inline">No tickets available.</div>}
        </div>
      </section>

      <div className="dashboard-note">
        <Clock3 size={17} />
        <span>SLA indicators below 24 hours are highlighted so the support team can act quickly.</span>
      </div>
    </div>
  );
}