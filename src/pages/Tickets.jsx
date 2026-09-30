import React, { useMemo, useState } from "react";
import { Edit3, Filter, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TicketTable from "../components/TicketTable";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import { priorities, statuses } from "../data/tickets";

export default function Tickets({ tickets, onDelete }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const perPage = 5;

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return tickets
      .filter((ticket) => {
        const matchesSearch = [ticket.id, ticket.subject, ticket.requester, ticket.category].some((value) =>
          value.toLowerCase().includes(query)
        );
        return matchesSearch &&
          (status === "All" || ticket.status === status) &&
          (priority === "All" || ticket.priority === priority);
      })
      .sort((a, b) => {
        if (sort === "priority") {
          const order = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return order[b.priority] - order[a.priority];
        }
        if (sort === "sla") return a.sla - b.sla;
        return new Date(b.updated) - new Date(a.updated);
      });
  }, [tickets, search, status, priority, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setSort("newest");
    setPage(1);
  };

  const simulateRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast("Ticket list refreshed");
    }, 600);
  };

  const editTicket = (ticket) => navigate(`/tickets/${ticket.id}?edit=true`);

  const removeTicket = () => {
    if (!confirm) return;
    onDelete(confirm.id);
    setConfirm(null);
    setToast("Ticket deleted successfully");
  };

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <h2>All Tickets</h2>
          <p>Search, filter, assign and track every support request.</p>
        </div>
        <Link to="/tickets/new" className="btn btn-primary"><Plus size={17} /> Create Ticket</Link>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="search-box">
            <Search size={17} />
            <input id="global-ticket-search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search tickets, customers..." />
          </div>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option>All</option>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
            <option>All</option>
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="priority">Priority</option>
            <option value="sla">SLA</option>
          </select>
          <button className="btn btn-secondary filter-btn" onClick={clearFilters}><Filter size={16} /> Clear</button>
          <button className="icon-btn light" onClick={simulateRefresh} aria-label="Refresh"><RefreshCw size={17} /></button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Ticket List</h3>
            <p>{filtered.length} ticket{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
          <div className="quick-actions">
            <span className="muted">Page {safePage} of {pages}</span>
          </div>
        </div>

        {loading ? (
          <div className="table-loading"><div className="spinner" /> Loading...</div>
        ) : visible.length ? (
          <TicketTable tickets={visible} onDelete={(ticket) => setConfirm(ticket)} onEdit={editTicket} />
        ) : (
          <EmptyState />
        )}

        <div className="pagination">
          <button disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} className={number === safePage ? "current" : ""} onClick={() => setPage(number)}>{number}</button>
          ))}
          <button disabled={safePage === pages} onClick={() => setPage((current) => Math.min(pages, current + 1))}>Next</button>
        </div>
      </section>

      <div className="feature-strip">
        <span><Edit3 size={15} /> Click a ticket to edit details</span>
        <span><Trash2 size={15} /> Delete actions are confirmed before removal</span>
      </div>

      <ConfirmModal
        open={!!confirm}
        title="Delete this ticket?"
        text={`This will permanently remove ${confirm?.id || "the ticket"} from the dashboard.`}
        confirmText="Delete Ticket"
        onConfirm={removeTicket}
        onCancel={() => setConfirm(null)}
      />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}