import "./App.css";
import { Inputs } from "./Components/Inputs.jsx";

function App() {
  const data = {
    name: "hello",
    desc: "hello, Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    interest1: "aroitnartnei",
    interest2: "aroitnartnei",
    interest3: "aroitnartnei",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  };

  return (
    <div>
      <Inputs props={data}></Inputs>
    </div>
  );
}

export default App;
