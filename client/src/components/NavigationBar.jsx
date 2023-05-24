import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import Searchbar from "./Searchbar";
import "./NavigationBar.scss";

function NavigationBar() {
  return (
      <div>
        {["xxl"].map((expand) => (
          <Navbar
            key={expand}
            bg="dark"
            variant="dark"
            expand={expand}
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
        ;
      </div>

  );
}

export default NavigationBar;
