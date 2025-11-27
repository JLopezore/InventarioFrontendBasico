import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contenido from '../pages/Contenido';
import GestorUbicaciones from '../pages/GestorUbicaciones';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contenido/:categoria" element={<Contenido />} />
        <Route path="/ubicaciones" element={<GestorUbicaciones />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
