import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Mygames from "./pages/Mygames";
import Gameprofile from "./pages/Gameprofile";
import Search from "./pages/Search";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Arcadia</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
            <Nav.Link as={Link} to="/mygames">My Games</Nav.Link>
            <Nav.Link as={Link} to="/search">Search game</Nav.Link>
          </Nav>
        </Container>
      </Navbar>



      <Routes>
        <Route path="search" element={<Search />}></Route>
        <Route path="mygames" element={<Mygames />}></Route>
        <Route path="gameprofile/:id" element={<Gameprofile />}></Route>
      </Routes>
      <br></br>
      {/* <button onClick={getGames}>Get Games</button> */}
    </div>
  );
}

export default App;

//1- get the data from the api and store in a state so that you can display it in my games
