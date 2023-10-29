import React, { useEffect, useState, useRef } from "react";
import './style.css';
import { createElement } from 'react';

// Component for key(WASD). Takes in props of name, onMouseDown, onMouseup. name to give an 
// id and label and onMousDown/Up to call function to change state. 
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

// Component for an empty key.
function Empty() {
  return <div className="key empty"></div>
}

// The whole keypad which renders in App.js
export default function Keypad() {
  //foreign code:
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

  // These const useStates are used to keep track of what key is being pressed. Default is false = not pressed.
  const [isWPressed, setIsWPressed] = useState(false);
  const [isAPressed, setIsAPressed] = useState(false);
  const [isSPressed, setIsSPressed] = useState(false);
  const [isDPressed, setIsDPressed] = useState(false);
  // State for connection
  const [isConnected, setIsConnected] = useState(false);

  // Change the specific state based on specific id of key pressed.
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

  // We need to track both presses and unpresses. 
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

  // useEffect occurs after the return(rendering). This part tracks whether keys on the keyboard are pressed and triggers the 
  // press and unpress function.
  useEffect(() => {
    const listener = document.getElementById("listener");
    listener.addEventListener("keydown", (event) => {
      press(event.key)
    });
    listener.addEventListener("keyup", (event) => {
      unpress(event.key)
    });
  });

  // useEffect occurs after the return. This useEffect tracks change in any of the useStates and calls the state() function
  // to create and send the state to console(later change to send it where we need).
  useEffect(() => {
    const keyW = document.getElementById('W')
    const keyA = document.getElementById('A')
    const keyS = document.getElementById('S')
    const keyD = document.getElementById('D')

    if (isWPressed) {
      keyW.style.backgroundColor = 'grey'
    } else {
      keyW.style.backgroundColor = '#e74c3c'
    }
    if (isAPressed) {
      keyA.style.backgroundColor = 'grey'
    } else {
      keyA.style.backgroundColor = '#2ecc71'
    }
    if (isSPressed) {
      keyS.style.backgroundColor = 'grey'
    } else {
      keyS.style.backgroundColor = '#e67e22'
    }
    if (isDPressed) {
      keyD.style.backgroundColor = 'grey'
    } else {
      keyD.style.backgroundColor = '#9b59b6'
    }
  }, [isWPressed, isAPressed, isSPressed, isDPressed]);

  // Simple dictionary
  function state() {
    const dict = {
      "W": "0",
      "A": "0",
      "S": "0",
      "D": "0"
    }

    console.log(isWPressed, isAPressed, isSPressed, isDPressed)

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
    return dict;
  }

  // Send data
  const sendData = (curr_state) => {
    console.log('sending', curr_state)
    fetch('http://localhost:5000/', {
      'method' : 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({"curr_state" : curr_state})
    }).then(resp => resp.json())
    .catch(error => console.log(error));
  }
  
  // Creates sending loop
  useInterval((put = state())  => {
    sendData(put)}, isConnected? 3000 : null);
  
  const reconnect = () => {
    setIsConnected(true);
  }
  const disconnect = () => {
    setIsConnected(false);
  }
  
  return <div id="listener">
  <button>Keyboard mode</button>
  <div>{isWPressed.toString()}, {isAPressed.toString()}, {isSPressed.toString()}, {isDPressed.toString()}</div>
  <div>
    <button onClick={reconnect}>Connect</button>
    <button onClick={disconnect}>Disconnect</button>
  </div>
  <div className="keypad">
    <Empty/>
    <Keys name='W' id='W' onMouseDown={() => press('w')} onMouseUp={() => unpress('w')}/>
    <Empty/>
    <Keys name='A' id='A' onMouseDown={() => press('a')} onMouseUp={() => unpress('a')}/>
    <Keys name='S' id='S' onMouseDown={() => press('s')} onMouseUp={() => unpress('s')}/>
    <Keys name='D' id='D' onMouseDown={() => press('d')} onMouseUp={() => unpress('d')}/>
  </div>
</div>;
}
