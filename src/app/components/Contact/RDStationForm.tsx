// components/RDStationForm.tsx
import { useEffect, useState } from "react";

const RDStationForm = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
      script.async = true;

      script.onload = () => {
        setIsScriptLoaded(true);
        new (window as any).RDStationForms(
          "formulario-lp-bull-fa0a87d19bed140e6c2a",
          "UA-111557246-1"
        ).createForm();
      };

      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  return (
    <div>
      {/* {isScriptLoaded && ( */}
      <div role="main" id="formulario-lp-bull-fa0a87d19bed140e6c2a"></div>
      {/* )} */}
    </div>
  );
};

export default RDStationForm;
