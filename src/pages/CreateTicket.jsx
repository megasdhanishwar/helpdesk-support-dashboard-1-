import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import Toast from "../components/Toast";

export default function CreateTicket({ tickets, onCreate }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const createTicket = (form) => {
    const now = new Date();
    const number = 1048 + tickets.length + 1;
    const ticket = {
      ...form,
      id: `HD-${number}`,
      assignee: form.assignee || "Unassigned",
      sla: form.priority === "Urgent" ? 12 : form.priority === "High" ? 24 : 72,
      created: now.toISOString(),
      updated: now.toISOString(),
      comments: [],
      activity: [
        { text: "Ticket created", time: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), type: "created" }
      ]
    };
    onCreate(ticket);
    setToast("Ticket created successfully");
    setTimeout(() => navigate(`/tickets/${ticket.id}`), 500);
  };

  return (
    <div className="page-stack narrow-page">
      <div className="page-heading">
        <div>
          <h2>Create New Ticket</h2>
          <p>Keep the request simple and include enough information for the support team.</p>
        </div>
      </div>
      <TicketForm onSubmit={createTicket} submitLabel="Create Ticket" />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}