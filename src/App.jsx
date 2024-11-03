import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShoppingListDetail from './routes/ShoppingListDetail';

function Home() {
  return (
    <div>
      <h1>Welcome to the Shopping List App</h1>
      <Link to="/shopping-list/1">View Grocery List</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;


