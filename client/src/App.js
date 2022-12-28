import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Mygames from "./pages/Mygames";
import Gameprofile from "./pages/Gameprofile";
import Search from "./pages/Search";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Searchbar from "./components/Searchbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Searchresults from "./pages/Searchresults";

function App() {
  return (
    <div className="App">
      <div>
        {["xxl"].map((expand) => (
          <Navbar
            key={expand}
            bg="dark"
            variant="dark"
            expand={expand}
            className="mb-3"
          >
            <Container fluid>
              <Navbar.Brand href="#">Arcadia</Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Arcadia
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="/mygames">
                      My Games
                    </Nav.Link>
                    <NavDropdown
                      title="My Account"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        Notifications
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Settings
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Searchbar />
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>

      <Routes>
        <Route path="searchresults" element={<Searchresults />}></Route>
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
