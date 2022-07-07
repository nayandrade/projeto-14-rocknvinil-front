import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SupplierContext from '../contexts/SupplierContext';
import SupplierProducts from './SupplierProducts';

export default function App() {

  const [supplier, setSupplier] = useState(
    localStorage.getItem('supplierdata')
        ? JSON.parse(localStorage.getItem('supplierdata'))
        : null
  );

  return (
    <BrowserRouter>
      <SupplierContext.Provider value={{ supplier, setSupplier }}>
        <Routes>
          <Route path='/' element={ <MainMenu/> } />
          <Route path='/myproducts' element={ <SupplierProducts/> } />
          <h1>Hello World</h1>
        </Routes>        
      </SupplierContext.Provider>      
    </BrowserRouter>
  );
}
