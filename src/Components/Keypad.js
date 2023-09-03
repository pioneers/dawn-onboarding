import React, { useEffect, useState } from "react";
import './style.css';
import { createElement } from 'react';

function State({msg}) {
  const text = {
    "W": "0",
    "A": "0",
    "S": "0",
    "D": "0"
  }
  const state = createElement(
    'div',
    {
      className: "board",
      id: 'state'
    }, 
    JSON.stringify(text)
  )
  return state
}

function Keys(props) {
  const key = createElement(
    'button',
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
  return <div id="listener">
  <button>Keyboard mode</button>
  <div>{isWPressed.toString()}, {isAPressed.toString()}, {isSPressed.toString()}, {isDPressed.toString()}</div>
  <div className="keypad">
    <Empty/>
    <Keys name='W' onMouseDown={(e) => {e.stopPropagation(); console.log('w'); setIsWPressed(true);}} onMouseUp={() => setIsWPressed(false)}/>
    <Empty/>
    <Keys name='A' onMouseDown={() => setIsAPressed(true)} onMouseUp={() => setIsAPressed(false)}/>
    <Keys name='S' onMouseDown={() => setIsSPressed(true)} onMouseUp={() => setIsSPressed(false)}/>
    <Keys name='D' onMouseDown={() => setIsDPressed(true)} onMouseUp={() => setIsDPressed(false)}/>
  </div>
</div>;
}
