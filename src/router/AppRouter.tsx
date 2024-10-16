import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import { Header } from "../components/Header"; // Certifique-se que está importando corretamente

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona para o login quando acessar a rota raiz ("/") */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Definição da rota /home com Header */}
        <Route
          path="/home"
          element={
            <>
              <Header /> {/* O Header é exibido apenas na Home */}
              <Home />
            </>
          }
        />

        {/* Rota de login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
