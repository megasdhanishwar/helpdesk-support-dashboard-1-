import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Check, Edit3, FileText, MessageCircle, Paperclip, Send, Trash2, UserRound } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import SlaBadge from "../components/SlaBadge";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import ErrorState from "../components/ErrorState";
import { agents } from "../data/tickets";

export default function TicketDetails({ tickets, onUpdate, onDelete }) {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [comment, setComment] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState("");

  const ticket = useMemo(() => tickets.find((item) => item.id === ticketId), [tickets, ticketId]);
  const editMode = searchParams.get("edit") === "true";

  useEffect(() => {
    if (ticket && !ticket.assignee) {
      onUpdate({ ...ticket, assignee: "Unassigned" });
    }
  }, [ticket]);

  if (!ticket) {
    return <ErrorState onRetry={() => navigate("/tickets")} />;
  }

  const update = (form) => {
    onUpdate({
      ...ticket,
      ...form,
      updated: new Date().toISOString(),
      activity: [
        ...(ticket.activity || []),
        { text: "Ticket details updated", time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), type: "updated" }
      ]
    });
    setSearchParams({});
    setToast("Ticket updated successfully");
  };

  const addComment = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    const now = new Date();
    const updated = {
      ...ticket,
      updated: now.toISOString(),
      comments: [
        ...(ticket.comments || []),
        { id: Date.now(), author: "Arun Kumar", text: comment.trim(), time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }
      ],
      activity: [
        ...(ticket.activity || []),
        { text: "Arun Kumar added a comment", time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), type: "comment" }
      ]
    };
    onUpdate(updated);
    setComment("");
    setToast("Comment added");
  };

  const assign = (event) => {
    const assignee = event.target.value;
    const updated = {
      ...ticket,
      assignee,
      activity: [
        ...(ticket.activity || []),
        { text: `Assigned to ${assignee}`, time: "Just now", type: "assigned" }
      ]
    };
    onUpdate(updated);
    setToast(`Assigned to ${assignee}`);
  };

  const changeStatus = (event) => {
    const status = event.target.value;
    onUpdate({
      ...ticket,
      status,
      updated: new Date().toISOString(),
      activity: [
        ...(ticket.activity || []),
        { text: `Status changed to ${status}`, time: "Just now", type: "updated" }
      ]
    });
    setToast(`Status changed to ${status}`);
  };

  const remove = () => {
    onDelete(ticket.id);
    setConfirm(false);
    navigate("/tickets");
  };

  if (editMode) {
    return (
      <div className="page-stack narrow-page">
        <div className="page-heading">
          <div>
            <button className="back-link" onClick={() => setSearchParams({})}><ArrowLeft size={16} /> Back to ticket</button>
            <h2>Edit {ticket.id}</h2>
            <p>Update ticket information and assignment.</p>
          </div>
        </div>
        <TicketForm initialData={ticket} onSubmit={update} submitLabel="Save Changes" />
        {toast && <Toast message={toast} onClose={() => setToast("")} />}
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="detail-heading">
        <div>
          <Link to="/tickets" className="back-link"><ArrowLeft size={16} /> Back to tickets</Link>
          <div className="detail-title-row">
            <span className="ticket-id large">{ticket.id}</span>
            <StatusBadge value={ticket.status} />
            <PriorityBadge value={ticket.priority} />
          </div>
          <h2>{ticket.subject}</h2>
          <p>Created by {ticket.requester} · {new Date(ticket.created).toLocaleDateString()}</p>
        </div>
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={() => setSearchParams({ edit: "true" })}><Edit3 size={16} /> Edit</button>
          <button className="btn btn-danger-outline" onClick={() => setConfirm(true)}><Trash2 size={16} /> Delete</button>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel">
            <div className="panel-head"><h3>Ticket Description</h3><FileText size={18} className="muted-icon" /></div>
            <p className="description-text">{ticket.description}</p>
          </section>

          <section className="panel">
            <div className="panel-head"><h3>Comments</h3><span className="count-pill">{ticket.comments?.length || 0}</span></div>
            <div className="comments">
              {(ticket.comments || []).map((item) => (
                <div className="comment" key={item.id}>
                  <div className="avatar">{item.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <div className="comment-body">
                    <div className="comment-head"><strong>{item.author}</strong><span>{item.time}</span></div>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
              {!ticket.comments?.length && <p className="muted empty-comment">No comments yet. Add the first response below.</p>}
            </div>
            <form className="comment-form" onSubmit={addComment}>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a reply..." rows="3" />
              <button className="btn btn-primary" type="submit"><Send size={16} /> Add Comment</button>
            </form>
          </section>

          <section className="panel">
            <div className="panel-head"><h3>Activity Timeline</h3><MessageCircle size={18} className="muted-icon" /></div>
            <div className="timeline">
              {(ticket.activity || []).map((item, index) => (
                <div className="timeline-item" key={`${item.text}-${index}`}>
                  <div className={`timeline-dot ${item.type}`}><Check size={12} /></div>
                  <div><strong>{item.text}</strong><span>{item.time}</span></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <section className="panel">
            <div className="panel-head"><h3>Ticket Details</h3></div>
            <div className="detail-list">
              <div><span><UserRound size={15} /> Requester</span><strong>{ticket.requester}</strong><small>{ticket.email}</small></div>
              <div><span><UserRound size={15} /> Assignee</span>
                <select value={ticket.assignee} onChange={assign}>
                  <option>Unassigned</option>
                  {agents.map((agent) => <option key={agent.id}>{agent.name}</option>)}
                </select>
              </div>
              <div><span>Status</span>
                <select value={ticket.status} onChange={changeStatus}>
                  <option>Open</option><option>In Progress</option><option>Pending</option><option>Resolved</option><option>Closed</option>
                </select>
              </div>
              <div><span>Category</span><strong>{ticket.category}</strong></div>
              <div><span>Priority</span><PriorityBadge value={ticket.priority} /></div>
              <div><span><CalendarDays size={15} /> Updated</span><strong>{new Date(ticket.updated).toLocaleDateString()}</strong></div>
            </div>
          </section>

          <section className="panel sla-panel">
            <div className="panel-head"><h3>SLA</h3><SlaBadge hours={ticket.sla} /></div>
            <div className="sla-meter"><div style={{ width: `${Math.min(100, ticket.sla)}%` }} /></div>
            <p>{ticket.sla < 24 ? "This ticket needs attention soon." : "SLA target is currently on track."}</p>
          </section>

          <section className="panel">
            <div className="panel-head"><h3>Attachments</h3><Paperclip size={17} className="muted-icon" /></div>
            <div className="attachments">
              {(ticket.attachments || []).map((file, index) => (
                <div className="attachment" key={`${file}-${index}`}><Paperclip size={15} /><span>{file}</span></div>
              ))}
              {!ticket.attachments?.length && <p className="muted">No attachments</p>}
            </div>
          </section>
        </aside>
      </div>

      <ConfirmModal
        open={confirm}
        title="Delete this ticket?"
        text={`Are you sure you want to delete ${ticket.id}? This action cannot be undone.`}
        confirmText="Delete Ticket"
        onConfirm={remove}
        onCancel={() => setConfirm(false)}
      />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}