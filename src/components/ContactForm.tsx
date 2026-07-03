import Script from "next/script";

const FORM_ID = "ZgkzNXPgqBrLCvgNWFzB";

export default function ContactForm() {
  return (
    <>
      <iframe
        src={`https://link.businessbalancesystem.com/widget/form/${FORM_ID}`}
        style={{
          width: "100%",
          height: "832px",
          border: "none",
          borderRadius: "15px",
        }}
        id={`inline-${FORM_ID}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Contact Us Form (on the website)"
        data-height="832"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        title="Contact Us Form (on the website)"
      />
      <Script
        src="https://link.businessbalancesystem.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
