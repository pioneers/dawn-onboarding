import React, { useEffect, useState } from "react";

const UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT";

const KeyHandler = () => {
  const [keyCount, setKeyCount] = useState({
    UP: 0,
    LEFT: 0,
    DOWN: 0,
    RIGHT: 0,
  });

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

  /* For UI button presses */
  const handleButtonClick = (direction, increment) => {
    setKeyCount((prevCount) => ({
      ...prevCount,
      [direction]: prevCount[direction] + (increment ? 1 : -1),
    }));
  };

  const directions = [UP, LEFT, RIGHT, DOWN];

  return (
    <div>
      <div>Press WASD or Arrow keys</div>
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
