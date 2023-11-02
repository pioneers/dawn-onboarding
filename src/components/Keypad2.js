import React, { useEffect, useState, useRef } from "react";
import { dataLayer } from "../actions/index.js";
import "./style.css";

const UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  EMPTY = "EMPTY";

const ROBOT_IP = "http://localhost:5000/"; // (fake robot)

function KeyHandler() {
  const [connected, setConnected] = useState(false);
  const [keyCount, setKeyCount] = useState({
    UP: 0,
    LEFT: 0,
    DOWN: 0,
    RIGHT: 0,
  });

  useEffect(() => {
    dataLayer.sendData(keyCount, ROBOT_IP);
  }, [keyCount]);

  /* For key presses */
  const keyMap = {
    w: UP,
    a: LEFT,
    s: DOWN,
    d: RIGHT,
    ArrowUp: UP,
    ArrowLeft: LEFT,
    ArrowDown: DOWN,
    ArrowRight: RIGHT,
  };

  const handleKeyEvent = (event, increment) => {
    const key = event.key;
    const direction = keyMap[key];
    if (direction && !event.repeat) {
      setKeyCount((prevCount) => ({
        ...prevCount,
        [direction]: prevCount[direction] + (increment ? 1 : -1),
      }));
    }
  };

  /* For key presses */
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyEvent(event, true);
    };

    const handleKeyUp = (event) => {
      handleKeyEvent(event, false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  /* For UI button presses. NOTE, TODO: bug when pressing down, and dragging
   cursor off the button, state still thinks that button is still pressed down */
  const handleButtonClick = (direction, increment) => {
    setKeyCount((prevCount) => ({
      ...prevCount,
      [direction]: prevCount[direction] + (increment ? 1 : -1),
    }));
  };

  function Key(props) {
    const dir = props.dir;
    return (
      <div
        className="key"
        onMouseDown={() => handleButtonClick(dir, true)}
        onMouseUp={() => handleButtonClick(dir, false)}
      >
        {dir.charAt(0).toUpperCase() + dir.slice(1)}
      </div>
    );
  }

  /* Ping interval */
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // Creates sending loop. Delay is null, so does not loop when connected is false. Delay is 3s when connected is true.
  useInterval(
    () => {
      dataLayer.sendData(keyCount, ROBOT_IP);
    },
    connected ? 500 : null
  );

  const reconnect = () => {
    setConnected(true);
  };
  const disconnect = () => {
    setConnected(false);
  };

  return (
    <div>
      <div>Press WASD or Arrow keys (UI buttons are buggy)</div>
      <button onClick={reconnect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <div className="keypad">
        <div className="key empty" />
        <Key dir={UP} />
        <div className="key empty" />
        <Key dir={LEFT} />
        <Key dir={DOWN} />
        <Key dir={RIGHT} />
      </div>

      <pre>{JSON.stringify(keyCount, null, 2)}</pre>
    </div>
  );
}

export default KeyHandler;
