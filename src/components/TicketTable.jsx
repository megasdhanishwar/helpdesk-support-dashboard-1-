import React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import SlaBadge from "./SlaBadge";

export default function TicketTable({ tickets, onDelete, onEdit }) {
  return (
    <div className="table-wrap">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Requester</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>SLA</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                <Link className="ticket-link" to={`/tickets/${ticket.id}`}>{ticket.id}</Link>
                <strong className="ticket-subject">{ticket.subject}</strong>
              </td>
              <td>
                <div className="requester-cell">
                  <div className="avatar small">{ticket.requester.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <span>{ticket.requester}</span>
                </div>
              </td>
              <td>{ticket.category}</td>
              <td><PriorityBadge value={ticket.priority} /></td>
              <td><StatusBadge value={ticket.status} /></td>
              <td>{ticket.assignee === "Unassigned" ? <span className="muted">Unassigned</span> : ticket.assignee}</td>
              <td><SlaBadge hours={ticket.sla} /></td>
              <td>
                <div className="row-actions">
                  <Link className="table-icon" to={`/tickets/${ticket.id}`} title="View"><Eye size={16} /></Link>
                  <button className="table-icon" title="Edit" onClick={() => onEdit(ticket)}><MoreHorizontal size={17} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && <div className="table-empty">No tickets match your search.</div>}
    </div>
  );
}