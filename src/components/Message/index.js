import React from "react";

import "./styles.css";

export default function Message({ type, text }) {
  return (
    <span id={type} className="message">
      {text}
    </span>
  );
}
