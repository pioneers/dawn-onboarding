import logo from "./logo.svg";
import "./App.css";
import Keypad from "./components/Keypad.js";
import Editor from "./components/Editor";

function App() {
  return <div className="App">
    <Editor/>
    {/* <Keypad /> */}
  </div>;
}

export default App;
