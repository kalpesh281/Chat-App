import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="*" element={<PageNotFound/>} />
  </Routes>

  </BrowserRouter>

  </>;
}

export default App;
