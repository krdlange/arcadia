import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

export default function Mygames() {
  const [myGames, setMyGames] = useState([]); //user's collection
  // const { id } = useParams(); //api id

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setGameId(id);
  };

  //store data state of clicked game
  // const [title, setTitle] = useState();
  // const [image, setImage] = useState();
  // const [apiId, setApiId] = useState();
  const [gameId, setGameId] = useState();

  //status & rating
  const status = ["To play", "Currently Playing", "Done"];
  const ratings = ["Not Rated", "1", "2", "3", "4", "5"];

  //input for edit
  const [input, setInput] = useState({
    // api_id: "",
    // user_id: "",
    status: "",
    my_rating: "",
  });

  //render user's collection
  useEffect(() => {
    viewList();
  }, []);

  //fetch user's collection
  const viewList = async () => {
    const response = await fetch("/gamecollection");
    const list = await response.json();
    setMyGames(list);
    console.log(list);
  };

  //edit user's game status & rating
  const updateGame = async () => {
    const response = await fetch(`/gamecollection/${gameId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: input.status,
        my_rating: input.my_rating,
      }),
    });
    const updatedList = await response.json();
    setMyGames(updatedList);
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
    updateGame();
  };

  //delete game from user's collection
  const deleteGame = async (id) => {
    // console.log(id);
    let confirmDelete = window.confirm("Delete game?");
    if (confirmDelete) {
      const response = await fetch(`/gamecollection/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedList = await response.json();
      // console.log(updatedList);
      setMyGames(updatedList);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <h1 className="display-1">My games</h1>
      </div>

      {myGames && (
        <div className="row">
          {myGames.map((gameInfo, index) => (
            <div className=" col-lg-4 col-md-4 col-sm-6 mb-4">
              <div className="card" key={index}>
                <a
                  href={`/gameprofile/${gameInfo.api_id}`}
                  className="link-dark"
                >
                  <img
                    alt={gameInfo.game_image}
                    height="220"
                    className="card-img-top rounded-2"
                    src={gameInfo.game_image}
                  />
                </a>

                <div className="card-body" key={index}>
                  <a
                    href={`/gameprofile/${gameInfo.api_id}`}
                    className="link-dark"
                  >
                    <div className="card-title" key={index}>
                      <h2 className="display-2">{gameInfo.game_name}</h2>
                    </div>
                  </a>

                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <h6 className="fw-light my-0">
                        <span className="badge bg-success">
                          My Rating: {ratings[`${gameInfo.my_rating}`]}
                        </span>
                      </h6>
                      <h6 className="fw-light my-0">
                        <span className="badge bg-success">
                          {status[`${gameInfo.status}`]}
                        </span>
                      </h6>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          handleShow(gameInfo.id);
                        }}
                      >
                        Edit<i className="fa-solid fa-pen-to-square ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {myGames && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>Edit game</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Set your game status</h5>
            <p>
              <select
                name="status"
                className="form-select"
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-danger"
              onClick={() => {
                deleteGame(setGameId);
              }}
            >
              Remove from list
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Save Game
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
