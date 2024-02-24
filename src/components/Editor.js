import { dataLayer } from "../actions/index.js";
import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor() {

  function onChange(newValue) {
    console.log("change", newValue);
  }

  // Render editor
  return (
    <div>    
      <AceEditor
      mode="python"
      theme="github"
      width="100%"
      onChange={onChange}
      name="CodeEditor"
      editorProps={{ $blockScrolling: true }}
      />
  </div>
  );
}

export default Editor;
