import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import { Header } from "../components/Header";
import { DREPage } from "../pages/DREPage"; 

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dre" element={<DREPage />} /> 
      </Routes>
    </Router>
  );
};
