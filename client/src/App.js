import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Mygames from './pages/Mygames';
import Gameprofile from './pages/Gameprofile';
import Search from './pages/Search';
import Modal1 from './components/Modal1';

function App() {
    
  return (
    <div className="App">
     <Link to="/mygames">My Games</Link>
     <Link to="/search">Search game</Link>


      <Routes>
      <Route path="search" element={<Search/>}></Route>
        <Route path="mygames" element={<Mygames/>}></Route>
        <Route path="gameprofile/:id" element={<Gameprofile/>}></Route>

      </Routes>
      <br></br>
      {/* <button onClick={getGames}>Get Games</button> */}


    </div>
  );
}

export default App;

//1- get the data from the api and store in a state so that you can display it in my games