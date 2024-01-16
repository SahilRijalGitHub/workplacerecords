import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path="/edit/:id" element={<Edit></Edit>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
