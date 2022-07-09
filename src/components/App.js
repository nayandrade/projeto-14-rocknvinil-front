import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SupplierProducts from './SupplierProducts';
import MainMenu from "./MainMenu";
import UserContext from "../contexts/UserContext.js";
import Cart from "./Cart.js";
import SignUp from './SignUp';
import SignIn from './SignIn';
import NewProduct from './NewProduct';

export default function App() {

  const [user, setUser] = useState(
    localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : null
  );

  const [token, setToken] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Routes>
          <Route path='/' element={ <MainMenu/> } />
          <Route path='/myproducts' element={ <SupplierProducts/> } />
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
