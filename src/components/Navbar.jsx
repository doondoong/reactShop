import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPenFill } from "react-icons/bs";
import { login, logout } from "../api/firebase";
export default function Navbar() {
  const [user, setUser] = useState();
  const handleLogin = () => {
    // 콜백함수에서 넘겨받은 리턴값이 실행함수 인자값과 동일한 경우 생략이 가능하다
    // login().then((item) => setUser(item)) => login().then(setUser)
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };
  return (
    <header className="flex justify-between border-b border-gray-300 p-3">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">carts</Link>
        <Link to="/products/new" className="text-2xl">
          <BsFillPenFill />
        </Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
