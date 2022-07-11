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
import Checkout from "./Checkout";

export default function App() {

  const [user, setUser] = useState(
    localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : null
  );

  const [token, setToken] = useState([]);
  const [cart, setCart] = useState()
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, token, setToken, cart, setCart, total, setTotal, loading, setLoading }}>
        <Routes>
          <Route path='/' element={ <MainMenu/> } />
          <Route path='/myproducts' element={ <SupplierProducts/> } />
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
