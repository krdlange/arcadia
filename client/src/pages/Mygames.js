import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Mygames() {
  const [myCollection, setMyCollection] = useState([]); //collection list
  const { id } = useParams(); //api id
  //for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //store data state of clicked game
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [apiId, setApiId] = useState();

  //input for edit
  const [input, setInput] = useState({
    api_id: "",
    user_id: "",
    status: "",
    my_rating: "",
  });

  //render list
  useEffect(() => {
    viewList();
  }, []);

  //fetch list
  const viewList = async () => {
    const response = await fetch("/gamecollection");
    const list = await response.json();
    setMyCollection(list);
    console.log(list);
  };

  //edit status
  const updateGameCollection = async () => {
    const response = await fetch("/gamecollection", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_id: apiId,
        game_name: title,
        game_image: image,
        user_id: 0,
        status: input.status,
        my_rating: input.my_rating,
      }),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateGameCollection();
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="mb-4 mt-4">My games</h1>

        {myCollection && (
          <div className="d-flex flex-wrap row">
            {myCollection.map((gameInfo, index) => (
              <div className="col-4 card" key={index}>
                <div className="card-body" key={index}>
                  <img
                    height="220"
                    className="card-img-top mb-2"
                    src={gameInfo.game_image}
                  />
                  <div className="card-title" key={index}>
                    <h3>{gameInfo.game_name}</h3>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="badge bg-success me-1">
                        Rating: {gameInfo.my_rating}
                      </span>
                      <span className="badge bg-success">
                        {gameInfo.status}
                      </span>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-m"
                        onClick={(e) => {
                          handleShow(e);
                        }}
                      >
                        Edit <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {myCollection && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>Edit {myCollection.name}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Set your game status</h5>
            <p>
              <select
                name="status"
                value="status"
                className="form-select"
                onChange={(e) => handleChange(e)}
              >
                <option selected>Choose game status...</option>
                <option value="1">To play</option>
                <option value="2">Currently Playing</option>
                <option value="3">Done Playing</option>
              </select>
            </p>
            <h5>Set your rating</h5>
            <p>
              <select
                value="my_rating"
                name="my_rating"
                className="form-select"
                onChange={(e) => handleChange(e)}
              >
                <option selected>Choose your rating...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              name="game_name"
              value={myCollection.name}
              onClick={handleSubmit}
            >
              Save Game
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
