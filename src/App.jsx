import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider} from "./context/GlobalContext.jsx";
import Header from "./components/Header.jsx";
import Panel from "./vistas/Panel.jsx";
import Registre from "./vistas/Registre.jsx";
import Login from "./vistas/Login.jsx";

export default function App() {
    return (
        <GlobalProvider>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registre" element={<Registre />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </GlobalProvider>
  )
}