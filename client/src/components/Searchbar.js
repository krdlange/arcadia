import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  //handle changes in searchbox input
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  //handle click/submit of searchbox input
  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(input);
    // console.log(input);
    navigate("/searchresults", { state: `${input}` });
  };

  return (
    <div>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search game..."
          value={input}
          className="me-2"
          aria-label="Search"
          onChange={(e) => handleInputChange(e)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}
