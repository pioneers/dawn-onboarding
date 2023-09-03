import React, { useEffect, useState } from "react";
import './style.css';
import { createElement } from 'react';

function Keys(props) {
  const key = createElement(
    'div',
    {
      className: "key",
      id: props.name,
      onMouseDown: props.onMouseDown,
      onMouseUp: props.onMouseUp
    },
    props.name
  )
  return key
}

function Empty() {
  return <div className="key empty"></div>
}

export default function Keypad() {
  const [isWPressed, setIsWPressed] = useState(false);
  const [isAPressed, setIsAPressed] = useState(false);
  const [isSPressed, setIsSPressed] = useState(false);
  const [isDPressed, setIsDPressed] = useState(false);

  useEffect(() => {
    const listener = document.getElementById("listener");
    listener.addEventListener("keydown", (event) => press(event.key));
    listener.addEventListener("keyup", (event) => unpress(event.key));

    function press(id) {
      if (id === "w") {
        setIsWPressed(true)
      }
      if (id === "a") {
        setIsAPressed(true)
      }
      if (id === "s") {
        setIsSPressed(true)
      }
      if (id === "d") {
        setIsDPressed(true)
      }
    }

    function unpress(id) {
      if (id === "w") {
        setIsWPressed(false)
      }
      if (id === "a") {
        setIsAPressed(false)
      }
      if (id === "s") {
        setIsSPressed(false)
      }
      if (id === "d") {
        setIsDPressed(false)
      }
    }
  });

  useEffect(() => {
    state();
  }, [isWPressed, isAPressed, isSPressed, isDPressed]);

  function state() {
    const dict = {
      "W": "0",
      "A": "0",
      "S": "0",
      "D": "0"
    }
    if (isWPressed) {
      dict["W"] = "1";
    }
    if (isAPressed) {
      dict["A"] = "1";
    }
    if (isSPressed) {
      dict["S"] = "1";
    }
    if (isDPressed) {
      dict["D"] = "1";
    }
    console.log(dict);
  }

  return <div id="listener">
  <button>Keyboard mode</button>
  <div>{isWPressed.toString()}, {isAPressed.toString()}, {isSPressed.toString()}, {isDPressed.toString()}</div>
  <div className="keypad">
    <Empty/>
    <Keys name='W' onMouseDown={() => setIsWPressed(true)} onMouseUp={() => setIsWPressed(false)}/>
    <Empty/>
    <Keys name='A' onMouseDown={() => setIsAPressed(true)} onMouseUp={() => setIsAPressed(false)}/>
    <Keys name='S' onMouseDown={() => setIsSPressed(true)} onMouseUp={() => setIsSPressed(false)}/>
    <Keys name='D' onMouseDown={() => setIsDPressed(true)} onMouseUp={() => setIsDPressed(false)}/>
  </div>
</div>;
}
