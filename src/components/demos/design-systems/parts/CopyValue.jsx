import { useState } from "react";

export function CopyValue({ value, label }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="dsys-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : label ?? value}
    </button>
  );
}
