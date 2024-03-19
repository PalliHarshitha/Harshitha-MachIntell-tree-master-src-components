import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./Components/product/product";
import Layout from "./Components/layout/layout";
import Home from "./Components/home/home";
import Dispatch from "./Components/dispatch/dispatch";
import FMEA from "./Components/fmea/fmea";
import FLCPS from "./Components/flcps/flcps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/fmea" element={<FMEA />} />
          <Route path="/flcps" element={<FLCPS />} />
          <Route path="/dispatch" element={<Dispatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
