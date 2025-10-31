// ...existing code...
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* example of redirect in v6:
              <Route path="/old-path" element={<Navigate to="/new-path" replace />} />
          */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
// ...existing code...