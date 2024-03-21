import { dataLayer } from "../actions/index.js";
import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import {Card, ButtonGroup, DropdownButton, Dropdown, Form} from 'react-bootstrap';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'bootstrap/dist/css/bootstrap.min.css';

function Editor() {

  function onChange(newValue) {
    console.log("change", newValue);
  }

  // Render editor
  return (
    <Card>    
      <Card.Header>
        <Card.Title style={{ fontSize: '14px' }}>
          Editor
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form inline>
          <ButtonGroup id="file-operations-buttons">
            <DropdownButton title="File">
              <Dropdown.Item >New File</Dropdown.Item>
              <Dropdown.Item >Open</Dropdown.Item>
              <Dropdown.Item >Save</Dropdown.Item>
              <Dropdown.Item >Save As</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Form>
        
        <AceEditor
        mode="python"
        theme="github"
        width="100%"
        onChange={onChange}
        name="CodeEditor"
        editorProps={{ $blockScrolling: true }}
        />
      </Card.Body>
  </Card>
  );
}

export default Editor;
