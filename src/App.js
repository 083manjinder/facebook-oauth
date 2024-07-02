import { BrowserRouter, } from "react-router-dom";
import Routers from "./Routers";
import "./App.css";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
