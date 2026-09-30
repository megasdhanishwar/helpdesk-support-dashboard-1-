import React from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": ["Dashboard", "Overview of your support activity"],
  "/tickets": ["Tickets", "Manage and track customer requests"],
  "/tickets/new": ["Create Ticket", "Create a new support request"]
};

export default function Topbar({ onMenu, onSearch }) {
  const location = useLocation();
  const detail = location.pathname.startsWith("/tickets/") && location.pathname !== "/tickets/new";
  const [title, subtitle] = detail
    ? ["Ticket Details", "View and manage the support request"]
    : titles[location.pathname] || ["Helpdesk", "Support Center"];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
          <Menu size={21} />
        </button>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" onClick={onSearch} aria-label="Search">
          <Search size={19} />
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <div className="top-avatar"><User size={18} /></div>
      </div>
    </header>
  );
}