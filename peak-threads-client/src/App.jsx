import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './context/CartContext';


//http://localhost:5173/ -> Home


function App() {

  return (
    <CartProvider>
    <Container>
      <NavbarComponent> </NavbarComponent>

        <BrowserRouter>
          <Routes>
            <Route index element={<Store/>} ></Route>
            <Route path = "success" element = {<Success/>} ></Route>
            <Route path = "cancel" element = {<Cancel/>} ></Route>
          </Routes>
      </BrowserRouter>
    </Container>
    </CartProvider>
  );
}

export default App
