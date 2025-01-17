// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import SideNav from './component/SideNav';
import Navbar from './pages/dashboard/Navbar';
import Products from './pages/product/Products';
import Orders from './pages/order/Orders';
import GoogleSignInButton from './config/GoogleSignInButton';

function App() {
  const [order,setOrder]= useState([
 
])
  return (
    <Router>
      <div className="App">
        <SideNav/>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/products" element={<Products order={order} setOrder={setOrder}/>} />
          <Route path="/orders" element={<Orders order={order} setOrder={setOrder}/>} />
        
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
