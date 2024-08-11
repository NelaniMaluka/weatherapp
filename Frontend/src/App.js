import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import AuthProvider from "./Components/Security/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useAuth } from "./Components/Security/AuthContext";
import Login from "./Components/Dashboard/Login";
import CreateAccount from "./Components/Dashboard/CreateAccount";
import ForgotPassword from "./Components/Dashboard/ForgotPassword";

import "./App.css";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  }
  return "";
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Create-Account" element={<CreateAccount />} />
            <Route path="/Forgot-Password" element={<ForgotPassword />} />
            <Route
              path="/Dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
