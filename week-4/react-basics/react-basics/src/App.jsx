import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  function addTodo() {
    const first = document.getElementById("first").value;
    const second = document.getElementById("second").value;
    const third = document.getElementById("btn");
    const container = document.getElementById("new-div");
    const childDiv1 = container.createElement("div");
    const childDiv2 = container.createElement("div");
    const childDiv3 = container.createElement("button");
    childDiv1.innerHTML = first;
    childDiv2.innerHTML = second;
    childDiv3.innerHTML = "Mark as done";
    document
      .getElementById("new-div")
      .appendChild(childDiv3)
      .addEventListener("click", function () {
        childDiv3.innerHTML = "Done";
      });
  }
  return (
    <div>
      <input id="first" type="text" placeholder="field first" />
      <br />
      <input id="second" type="text" placeholder="second first" />
      <br />
      <button id="btn" onClick={addTodo()}>
        Add todo
      </button>
      <div id="new-div"></div>
    </div>
  );
}

export default App;
