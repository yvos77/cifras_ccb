import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaHinos from "./pages/ListaHinos";
import PaginaHino from "./pages/PaginaHino";

function App() {
  const [aba, setAba] = useState("hinario");

  return (
    <BrowserRouter basename="/cifras_ccb">
      <Routes>
        <Route path="/" element={<ListaHinos aba={aba} setAba={setAba} />} />
        <Route path="/hino/:slug" element={<PaginaHino />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;