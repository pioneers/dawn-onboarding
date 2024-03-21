import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { basicDark } from "@uiw/codemirror-theme-basic";
// import showSaveFilePicker 

function Editor() {
  const [value, setValue] = React.useState("print(\"hello world!\")");

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  const saveFile = async (blob, suggestedName) => {
    // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
    const supportsFileSystemAccess =
      'showSaveFilePicker' in window &&
      (() => {
        try {
          return window.self === window.top;
        } catch {
          return false;
        }
      })();
    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
      try {
        // Show the file save dialog.
        const handle = await window.showSaveFilePicker({
          suggestedName,
        });
        // Write the blob to the file.
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;
      } catch (err) {
        // Fail silently if the user has simply canceled the dialog.
        if (err.name !== 'AbortError') {
          console.error(err.name, err.message);
          return;
        }
      }
    }
    // Fallback if the File System Access API is not supported…
    // Create the blob URL.
    const blobURL = URL.createObjectURL(blob);
    // Create the `<a download>` element and append it invisibly.
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = suggestedName;
    a.style.display = 'none';
    document.body.append(a);
    // Programmatically click the element.
    a.click();
    // Revoke the blob URL and remove the element.
    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
      a.remove();
    }, 1000);
  };

  
  return (
    <div>
      <button onClick={saveFile}> save file heheheheheheh</button>



    <CodeMirror
      value={value}
      height="200px"
      theme={basicDark}
      extensions={[python()]}
      onChange={onChange}
    />
    </div>
  );
}

export default Editor;
