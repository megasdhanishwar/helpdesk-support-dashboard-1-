import React from "react";
import { BarChart3, Headphones, Inbox, Plus, Settings, Users, X, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/tickets", label: "Tickets", icon: Inbox },
  { to: "/tickets/new", label: "Create Ticket", icon: Plus }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-overlay" onClick={onClose} aria-label="Close menu" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <div className="brand">
            <div className="brand-icon"><Headphones size={19} /></div>
            <div>
              <strong>Helpdesk</strong>
              <span>Support Center</span>
            </div>
          </div>
          <button className="mobile-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list">
          <p className="nav-label">Workspace</p>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          <p className="nav-label">Manage</p>
          <button className="nav-item" type="button">
            <Users size={18} />
            <span>Customers</span>
          </button>
          <button className="nav-item" type="button">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="agent-mini">
            <div className="avatar"><User size={18} /></div>
            <div>
              <strong>Admin</strong>
              <span>Support Agent</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}