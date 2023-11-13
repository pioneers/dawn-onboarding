import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { basicDark } from "@uiw/codemirror-theme-basic";

function Editor() {
  const [value, setValue] = React.useState("print(\"hello world!\")");

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="200px"
      theme={basicDark}
      extensions={[python()]}
      onChange={onChange}
    />
  );
}

export default Editor;
