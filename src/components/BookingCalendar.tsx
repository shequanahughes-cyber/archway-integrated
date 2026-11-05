import Script from "next/script";
import { bookingCalendar } from "@/lib/site";

// LeadConnector booking calendar. form_embed.js resizes the iframe to fit
// the calendar once it loads; minHeight just keeps the space reserved
// until then so the page doesn't jump.
export default function BookingCalendar() {
  return (
    <>
      <iframe
        src={`https://link.businessbalancesystem.com/widget/booking/${bookingCalendar.id}`}
        allow="payment"
        scrolling="no"
        style={{
          width: "100%",
          minHeight: "700px",
          border: "none",
          overflow: "hidden",
        }}
        id={bookingCalendar.embedId}
        title="Book an appointment"
      />
      <Script
        src="https://link.businessbalancesystem.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
