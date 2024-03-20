import { BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css';
import ProductList from './products/ProductList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<ProductList/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
