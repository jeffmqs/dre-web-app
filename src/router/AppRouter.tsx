import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import { Header } from "../components/Header";
import { DREPage } from "../pages/DREPage";
import FormPage from "../pages/Forms/FormPage.tsx";
import DynamicFormPage from "../pages/Forms/DynamicFormPage.tsx";
import FormProdService from "../pages/Forms/FormProdService.tsx";
import ProductCad from "../pages/Forms/ProductCad.tsx";
import ServiceCad from "../pages/Forms/ServiceCad.tsx";

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
          {/* Futuramente Mudar esses Routes para algo mais intuitivo ou que faça mais sentido */}

          <Route path="/form" element={<FormPage />} /> {/* Página do formulário */}

          <Route path="/cost" element={<DynamicFormPage />} /> {/* Página do formulário de custos etc*/}

          <Route path="/formProdService" element={<FormProdService />} /> {/* Página para escolher o cadastro de produtos e serviços*/}

          <Route path="/productCad" element={<ProductCad />} />
          <Route path="/serviceCad" element={<ServiceCad />} />

          <Route path="/login" element={<Login />} />
        <Route path="/dre" element={<DREPage />} /> 
      </Routes>
    </Router>
  );
};
