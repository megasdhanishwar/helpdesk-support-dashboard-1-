import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { agents, categories, priorities, statuses } from "../data/tickets";

const emptyForm = {
  subject: "",
  description: "",
  requester: "",
  email: "",
  category: "Technical",
  priority: "Medium",
  status: "Open",
  assignee: "Unassigned",
  attachments: []
};

export default function TicketForm({ initialData, onSubmit, submitLabel = "Create Ticket" }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...(initialData || {}) }));
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.requester.trim()) next.requester = "Requester name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) onSubmit(form);
  };

  const addFiles = (event) => {
    const names = Array.from(event.target.files || []).map((file) => file.name);
    update("attachments", [...(form.attachments || []), ...names]);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field field-full">
          <span>Subject *</span>
          <input value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="Enter ticket subject" />
          {errors.subject && <small className="field-error">{errors.subject}</small>}
        </label>

        <label className="field">
          <span>Requester *</span>
          <input value={form.requester} onChange={(e) => update("requester", e.target.value)} placeholder="Customer name" />
          {errors.requester && <small className="field-error">{errors.requester}</small>}
        </label>

        <label className="field">
          <span>Email *</span>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="customer@example.com" />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={(e) => update("category", e.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Priority</span>
          <select value={form.priority} onChange={(e) => update("priority", e.target.value)}>
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select value={form.status} onChange={(e) => update("status", e.target.value)}>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Assign to</span>
          <select value={form.assignee} onChange={(e) => update("assignee", e.target.value)}>
            <option>Unassigned</option>
            {agents.map((agent) => <option key={agent.id}>{agent.name}</option>)}
          </select>
        </label>

        <label className="field field-full">
          <span>Description *</span>
          <textarea rows="6" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the issue clearly..." />
          {errors.description && <small className="field-error">{errors.description}</small>}
        </label>

        <div className="field field-full">
          <span>Attachments</span>
          <label className="upload-box">
            <Paperclip size={18} />
            <span>Choose files</span>
            <input type="file" multiple onChange={addFiles} />
          </label>
          {!!form.attachments?.length && (
            <div className="file-list">
              {form.attachments.map((file, index) => <span key={`${file}-${index}`}>{file}</span>)}
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}