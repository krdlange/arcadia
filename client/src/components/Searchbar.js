import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Searchbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  //of searchbox input
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  //of searchbox input
  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(input);
    // console.log(input);
    navigate("/searchresults", { state: `${input}` });
    window.location.reload();
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
          onChange={(e) => handleChange(e)}
        />
        <Button className="btn btn-primary" ButtonText="Search" onClick={handleSubmit} />
      </Form>
    </div>
  );
}
