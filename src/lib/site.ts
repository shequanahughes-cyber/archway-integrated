// Contact details shown in the footer and on the Contact page. `null` (or
// an empty phones list) renders as "pending" until the client provides
// the real value.
export const contactInfo: {
  location: string;
  address: string | null;
  phones: { label: string; number: string }[];
  email: string | null;
  hours: { days: string; time: string }[] | null;
} = {
  location: "Downtown St. Louis Regional Hub",
  address: "1304 Papin 63103",
  phones: [
    { label: "Toll-free", number: "+1 866-293-4929" },
    { label: "Local", number: "314-380-0357" },
  ],
  email: null,
  hours: null,
};

// "+1 866-293-4929" -> "tel:+18662934929", "314-380-0357" -> "tel:+13143800357"
export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+1${digits}`}`;
}

// LeadConnector booking calendar (Appointments page). embedId is the iframe
// id from the embed code LeadConnector generated - kept as-is since
// form_embed.js looks the iframe up by it.
export const bookingCalendar = {
  id: "IwWcq0y3Z3AzoPieV8ei",
  embedId: "IwWcq0y3Z3AzoPieV8ei_1793846503897",
};

// LeadConnector form IDs (link.businessbalancesystem.com). Partner requests
// reuse the general contact form until a dedicated form is built - swap the
// ID here when it exists.
export const formIds = {
  contact: "ZgkzNXPgqBrLCvgNWFzB",
  partner: "ZgkzNXPgqBrLCvgNWFzB",
};
