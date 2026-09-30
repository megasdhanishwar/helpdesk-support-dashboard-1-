export const categories = [
  "Technical",
  "Billing",
  "Account",
  "Product",
  "General"
];

export const priorities = ["Low", "Medium", "High", "Urgent"];

export const statuses = ["Open", "In Progress", "Pending", "Resolved", "Closed"];

export const agents = [
  { id: "AG-01", name: "Arun Kumar", initials: "AK" },
  { id: "AG-02", name: "Priya S", initials: "PS" },
  { id: "AG-03", name: "Rahul M", initials: "RM" },
  { id: "AG-04", name: "Divya R", initials: "DR" }
];

export const initialTickets = [
  {
    id: "HD-1048",
    subject: "Unable to reset account password",
    description: "The customer receives an error after submitting the password reset form.",
    requester: "Karthik Raj",
    email: "karthik@example.com",
    category: "Account",
    priority: "High",
    status: "Open",
    assignee: "Arun Kumar",
    sla: 72,
    created: "2026-09-30T08:20:00",
    updated: "2026-09-30T10:15:00",
    comments: [
      { id: 1, author: "Karthik Raj", text: "I tried the reset link twice but the same error appears.", time: "10:15 AM" }
    ],
    activity: [
      { text: "Ticket created", time: "8:20 AM", type: "created" },
      { text: "Assigned to Arun Kumar", time: "8:45 AM", type: "assigned" },
      { text: "Customer added a comment", time: "10:15 AM", type: "comment" }
    ],
    attachments: ["reset-error.png"]
  },
  {
    id: "HD-1047",
    subject: "Invoice amount looks incorrect",
    description: "Customer says the latest invoice contains an unexpected extra charge.",
    requester: "Meena Devi",
    email: "meena@example.com",
    category: "Billing",
    priority: "Urgent",
    status: "In Progress",
    assignee: "Priya S",
    sla: 18,
    created: "2026-09-30T07:10:00",
    updated: "2026-09-30T11:05:00",
    comments: [
      { id: 1, author: "Priya S", text: "I am checking the invoice history now.", time: "11:05 AM" }
    ],
    activity: [
      { text: "Ticket created", time: "7:10 AM", type: "created" },
      { text: "Priority changed to Urgent", time: "7:35 AM", type: "updated" },
      { text: "Assigned to Priya S", time: "8:00 AM", type: "assigned" }
    ],
    attachments: ["invoice.pdf"]
  },
  {
    id: "HD-1046",
    subject: "Dashboard loading slowly",
    description: "Analytics dashboard takes more than 20 seconds to load for the customer.",
    requester: "Suresh V",
    email: "suresh@example.com",
    category: "Technical",
    priority: "Medium",
    status: "Pending",
    assignee: "Rahul M",
    sla: 34,
    created: "2026-09-29T15:30:00",
    updated: "2026-09-30T09:40:00",
    comments: [],
    activity: [
      { text: "Ticket created", time: "Yesterday", type: "created" },
      { text: "Assigned to Rahul M", time: "Yesterday", type: "assigned" },
      { text: "Waiting for server logs", time: "9:40 AM", type: "updated" }
    ],
    attachments: []
  },
  {
    id: "HD-1045",
    subject: "Feature request for export",
    description: "Customer wants a CSV export button on the reports page.",
    requester: "Naveen P",
    email: "naveen@example.com",
    category: "Product",
    priority: "Low",
    status: "Resolved",
    assignee: "Divya R",
    sla: 100,
    created: "2026-09-28T11:20:00",
    updated: "2026-09-29T16:20:00",
    comments: [
      { id: 1, author: "Divya R", text: "The request has been added to the product backlog.", time: "4:20 PM" }
    ],
    activity: [
      { text: "Ticket created", time: "Sep 28", type: "created" },
      { text: "Assigned to Divya R", time: "Sep 28", type: "assigned" },
      { text: "Ticket resolved", time: "Sep 29", type: "resolved" }
    ],
    attachments: []
  },
  {
    id: "HD-1044",
    subject: "Need help updating profile",
    description: "Customer needs help changing their company information.",
    requester: "Asha K",
    email: "asha@example.com",
    category: "General",
    priority: "Low",
    status: "Closed",
    assignee: "Arun Kumar",
    sla: 100,
    created: "2026-09-27T09:00:00",
    updated: "2026-09-28T12:00:00",
    comments: [],
    activity: [
      { text: "Ticket created", time: "Sep 27", type: "created" },
      { text: "Ticket closed", time: "Sep 28", type: "closed" }
    ],
    attachments: []
  },
  {
    id: "HD-1043",
    subject: "Payment page shows blank screen",
    description: "The payment page becomes blank after selecting a payment method.",
    requester: "Vignesh S",
    email: "vignesh@example.com",
    category: "Technical",
    priority: "Urgent",
    status: "Open",
    assignee: "Rahul M",
    sla: 12,
    created: "2026-09-30T09:15:00",
    updated: "2026-09-30T10:55:00",
    comments: [],
    activity: [
      { text: "Ticket created", time: "9:15 AM", type: "created" },
      { text: "Assigned to Rahul M", time: "9:30 AM", type: "assigned" }
    ],
    attachments: ["payment-screen.png"]
  },
  {
    id: "HD-1042",
    subject: "Product information question",
    description: "Customer needs clarification about a product feature.",
    requester: "Harish B",
    email: "harish@example.com",
    category: "Product",
    priority: "Medium",
    status: "In Progress",
    assignee: "Priya S",
    sla: 45,
    created: "2026-09-29T10:00:00",
    updated: "2026-09-30T08:10:00",
    comments: [],
    activity: [
      { text: "Ticket created", time: "Sep 29", type: "created" },
      { text: "Assigned to Priya S", time: "Sep 29", type: "assigned" }
    ],
    attachments: []
  }
];