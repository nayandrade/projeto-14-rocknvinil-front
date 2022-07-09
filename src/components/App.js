import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SupplierProducts from './SupplierProducts';
import MainMenu from "./MainMenu";
import UserContext from "../contexts/UserContext.js";
import Cart from "./Cart.js";
import SignUp from './SignUp.js';

export default function App() {

  const [user, setUser] = useState(
    localStorage.getItem('supplierdata')
        ? JSON.parse(localStorage.getItem('supplierdata'))
        : null
  );

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={ <MainMenu/> } />
          <Route path='/myproducts' element={ <SupplierProducts/> } />
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
