import '../styles/reset.css'
import '../styles/styles.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext.js";
import Cart from "./Cart.js";
import Base from "./Base.js";
import SignUp from './SignUp.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
