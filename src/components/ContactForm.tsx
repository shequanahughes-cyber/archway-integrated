import Script from "next/script";
import { formIds } from "@/lib/site";

export default function ContactForm({
  formId = formIds.contact,
  formName = "Contact Us Form (on the website)",
}: {
  formId?: string;
  formName?: string;
}) {
  return (
    <>
      <iframe
        src={`https://link.businessbalancesystem.com/widget/form/${formId}`}
        style={{
          width: "100%",
          height: "832px",
          border: "none",
          borderRadius: "15px",
        }}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height="832"
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={formName}
      />
      <Script
        src="https://link.businessbalancesystem.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
