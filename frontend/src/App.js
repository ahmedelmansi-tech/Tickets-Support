import { BrowserRouter, Routes, Route } from "react-router-dom";

//-------------Pages-------------------//
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

//------------Components---------------//
import Header from "./components/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
