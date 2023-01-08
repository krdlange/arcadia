import React from "react";
import Modal from "react-bootstrap/Modal";

export default function AddGameForm() {
  return (
    <div>
      <Modal.Body>
        <Modal.Title>
          <h2>Add to your game collection</h2>
        </Modal.Title>
        <h5>Set your game status</h5>
        <p>
          <select
            name="status"
            className="form-select"
            //   onChange={(e) => handleChange(e)}
          >
            <option selected>Choose game status...</option>
            <option value="0">To play</option>
            <option value="1">Currently Playing</option>
            <option value="2">Done Playing</option>
          </select>
        </p>
        <h5>Set your rating</h5>
        <p>
          <select
            name="my_rating"
            className="form-select"
            //   onChange={(e) => handleChange(e)}
          >
            <option selected>Choose your rating...</option>
            <option value="0">Rate Later</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </p>
      </Modal.Body>
 
    </div>
  );
}
