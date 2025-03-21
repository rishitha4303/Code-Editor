import React from "react";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

export default function Editor({ language, displayName, value, onChange, isCollapsed, toggleEditor }) {
  const extensions =
    language === "javascript"
      ? [javascript()]
      : language === "html"
      ? [html()]
      : language === "css"
      ? [css()]
      : [];

  return (
    <div className={`editor-container ${isCollapsed ? "collapsed" : ""}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={toggleEditor}
        >
          <FontAwesomeIcon icon={isCollapsed ? faExpandAlt : faCompressAlt} />
        </button>
      </div>
      
      {/* Instead of hiding, adjust height */}
      <div className="code-mirror-wrapper" style={{ height: isCollapsed ? "30px" : "300px" }}>
        <CodeMirror
          value={value}
          height="300px" 
          theme={dracula}
          extensions={extensions}
          onChange={(val) => onChange(val)} // Ensure proper onChange handling
        />
      </div>
    </div>
  );
}
