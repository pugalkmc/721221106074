import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ProductList from "./products/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
