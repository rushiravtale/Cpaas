import React, { useEffect, useRef } from "react";
import "./textAreaStyles.scss";

export default function TextareaControl({
  label,
  value,
  onChange,
  styles = "",
  rows = 1,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate correctly
    textarea.style.height = "0px";

    // Set new height based on content
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className={`textarea-control-wrapper ${styles}`}>
      {label && <label className="textarea-label">{label}</label>}

      <textarea
        ref={textareaRef}
        className="textarea-box"
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
}
