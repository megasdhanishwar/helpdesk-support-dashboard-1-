import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";
import { initialTickets } from "./data/tickets";

export default function App() {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem("helpdesk-tickets");
      return saved ? JSON.parse(saved) : initialTickets;
    } catch {
      return initialTickets;
    }
  });

  useEffect(() => {
    localStorage.setItem("helpdesk-tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticket) => setTickets((current) => [ticket, ...current]);

  const updateTicket = (updated) => {
    setTickets((current) =>
      current.map((ticket) => ticket.id === updated.id ? updated : ticket)
    );
  };

  const deleteTicket = (id) => {
    setTickets((current) => current.filter((ticket) => ticket.id !== id));
  };

  return (
    <Routes>
      <Route element={<AppLayout tickets={tickets} />}>
        <Route path="/" element={<Dashboard tickets={tickets} />} />
        <Route
          path="/tickets"
          element={<Tickets tickets={tickets} onDelete={deleteTicket} />}
        />
        <Route
          path="/tickets/new"
          element={<CreateTicket tickets={tickets} onCreate={addTicket} />}
        />
        <Route
          path="/tickets/:ticketId"
          element={
            <TicketDetails
              tickets={tickets}
              onUpdate={updateTicket}
              onDelete={deleteTicket}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}