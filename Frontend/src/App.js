import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import AuthProvider from "./Components/Security/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectedNews from "./Components/News/SelectedNews";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/News/:articleTitle" element={<SelectedNews />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
