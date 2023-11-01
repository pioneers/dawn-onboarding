import React, { useEffect, useState } from "react";
import { dataLayer } from "../actions/index.js";

const UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT";

const ROBOT_IP = "http://localhost:5000/"; // (fake robot)

const KeyHandler = () => {
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

  const directions = [UP, LEFT, RIGHT, DOWN];

  return (
    <div>
      <div>Press WASD or Arrow keys (try not to use the UI buttons)</div>
      {directions.map((dir) => (
        <button
          onMouseDown={() => handleButtonClick(dir, true)}
          onMouseUp={() => handleButtonClick(dir, false)}
        >
          {dir.charAt(0).toUpperCase() + dir.slice(1)}
        </button>
      ))}

      <pre>{JSON.stringify(keyCount, null, 2)}</pre>
    </div>
  );
};

export default KeyHandler;
