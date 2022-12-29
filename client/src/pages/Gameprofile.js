import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Gameprofile() {
  const [game, setGame] = useState([]); //show game profile
  const { id } = useParams(); //api id

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add to db
  const [saveGame, setSaveGame] = useState ({
    id: "",
    api_id: `${id}`,
    user_id: "",
    status: "",
    my_rating: ""
  });

  //call fetchGame after render
  useEffect(() => {
    fetchGame();
  }, []);

  //fetch game profile
  const fetchGame = async () => {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`, {
      method: "GET",
    });
    const gameInfo = await response.json();
    console.log(gameInfo);
    setGame(gameInfo);
  };

  //add game to my collection
  const addGameToCollection = async () => {
    const response = await fetch("/")
  }
  return (
    <div>
      <div className="container d-flex  mt-4">
        <div className="col-md-4 me-4">
          <img className="img-fluid" src={game.background_image} />
        </div>

        <div>
          <h1>{game.name}</h1>
          <div>
            <h5>Release date: {game.released}</h5>
          </div>
          {game.genres && (
            <div>
              {game.genres.map((genres) => {
                return (
                  <h5 key={genres.id}>
                    <span className="badge bg-secondary">{genres.name}</span>
                  </h5>
                );
              })}
            </div>
          )}

          <div className="mt-4">
            <Button variant="primary" onClick={handleShow}>
              Add to collection
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Add {game.name} to your game collection
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Set your game status</h5>
                <p>
                  <select
                    name="status"
                    className="form-select"
                    // onChange={(e) => handleChange(e)}
                  >
                    <option selected>Choose game status...</option>
                    <option value="To Play">To play</option>
                    <option value="Currently playing">Currently Playing</option>
                    <option value="Done Playing">Done Playing</option>
                  </select>
                </p>
                <h5>Set your rating</h5>
                <p>
                  <select
                    name="rating"
                    className="form-select"
                    // onChange={(e) => handleChange(e)}
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
                <Button variant="primary" onClick={handleClose}>
                  Save Game
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div className="container d-flex mt-4">
        <div className="row">
          <div className="card col-8 me-3">
            <div className="card-body">
              <h5 className="card-title mb-1 mt-2">Description</h5>
              <p className="card-text mb-4">{game.description_raw}</p>

              <h5 className="card-title">Developers </h5>
              <div className="card-text mb-4">
                {game.developers && (
                  <div>
                    {game.developers.map((developers) => {
                      return (
                        <h5 key={developers.name}>
                          <span className="badge bg-secondary">
                            {developers.name}
                          </span>
                        </h5>
                      );
                    })}
                  </div>
                )}
              </div>

              <h5 className="card-title mb-1">Stores </h5>
              <div className="card-text mb-4">
                {game.stores && (
                  <div>
                    {game.stores.map((stores) => {
                      return (
                        <a
                          href={`http://www.${stores.store.domain}`}
                          target="_blank"
                        >
                          <h5 key={stores.store.name}>
                            <span
                              key={stores.store.id}
                              className="badge bg-secondary me-2"
                            >
                              {stores.store.name}
                            </span>
                          </h5>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card col-3">
            <div className="card-body">
              <h5 className="card-title mb-1 mt-2">Metacritic rating </h5>
              <h2 className="card-text mb-4">{game.rating}</h2>

              <h5 className="card-title mb-1">Platforms </h5>
              <div className="card-text mb-4">
                {game.platforms && (
                  <div>
                    {game.platforms.map((platforms) => {
                      return (
                        <div key={platforms.platform.id}>
                          <span className="badge bg-secondary">
                            {platforms.platform.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <h5 className="card-title mb-1">ESRB Rating </h5>
              <div className="card-text mb-4">
                {game.esrb_rating && (
                  <div>
                    {Object.keys(game.esrb_rating).map((key, index) => {
                      return (
                        <div key={index}>
                          {key} : {game.esrb_rating[key]}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
