//! auth.js token
import React from "react";

const App = () => {
  React.useState([1]);

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement("h1", { style: { color: "blue" } }, "Hello, World!"),
    React.createElement("p", null, "This is an example using React.createElement.")
  );
};

export default App;

import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Initialize count to 0

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1); // Update state based on previous state
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Counter;
