import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, navigate } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Signin from './components/Signin';
import Register from './components/Register';
import Unique from './components/Unique';

function App() {
  return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/create" exact element={<Create/>} />
          <Route path="/signin" exact element={<Signin/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/:id" exact element={<Unique/>} />
        </Routes>
        </BrowserRouter>
      </div>
  );


}

export default App;
