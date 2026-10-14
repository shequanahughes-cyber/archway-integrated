// Contact details shown in the footer and on the Contact page. `null`
// renders as "pending" until the client provides the real value.
export const contactInfo: {
  location: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: { days: string; time: string }[] | null;
} = {
  location: "Downtown St. Louis Regional Hub",
  address: null,
  phone: null,
  email: null,
  hours: null,
};

// LeadConnector form IDs (link.businessbalancesystem.com). Appointment and
// partner requests reuse the general contact form until dedicated forms are
// built - swap the IDs here when they exist.
export const formIds = {
  contact: "ZgkzNXPgqBrLCvgNWFzB",
  appointment: "ZgkzNXPgqBrLCvgNWFzB",
  partner: "ZgkzNXPgqBrLCvgNWFzB",
};
