import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "../components/PrimaryButton";
import PrimaryButton from "../components/PrimaryButton";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Gameprofile() {
  const [game, setGame] = useState([]); //show game profile
  const { id } = useParams(); //api id
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  // const [trailer, setTrailer] = useState([]);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const releaseDate = new Date(game.released).toLocaleDateString(
    "en-US",
    options
  );

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add to db
  const [input, setInput] = useState({
    api_id: `${id}`,
    user_id: "",
    status: "",
    my_rating: "",
  });

  //call fetchGame after render
  useEffect(() => {
    fetchGame();
    // fetchGameTrailer();
  }, []);

  //fetch game profile
  const fetchGame = async () => {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`, {
      method: "GET",
    });
    const gameInfo = await response.json();
    console.log(gameInfo);
    setGame(gameInfo);
    setTitle(gameInfo.name);
    setImage(gameInfo.background_image);
  };

  // const fetchGameTrailer = async () => {
  //   const response = await fetch(`${BASE_URL}/${id}/movies?key=${API_KEY}`, {
  //     method: "GET",
  //   });
  //   const gameTrailer = await response.json();
  //   console.log(gameTrailer);
  //   setTrailer(gameTrailer);
  // }

  //add game to my collection
  const addGameToCollection = async () => {
    const response = await fetch("/gamecollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_id: `${id}`,
        game_name: title,
        game_image: image,
        user_id: 0,
        status: input.status,
        my_rating: input.my_rating,
      }),
    });
    alert("Game saved!");
    setShow(false);
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
    addGameToCollection();
  };

  return (
    <div className="container mt-4">
      <div className="d-md-flex justify-content-md-between">
        <div className="d-flex flex-column col-md-6 mb-2">
          <h1 className="display-1">{game.name}</h1>
          {/* {game.genres && (
            <div className="d-flex justify-content-start">
              <p className="me-1">Genre:</p>
              {game.genres.map((genres) => {
                return (
                  <div className="me-1" key={genres.id}>
                    {genres.name}
                  </div>
                );
              })}
            </div>
          )} */}
          {game.genres && (
            <div className="d-flex justify-content-start">
              <span className="me-1">Genre:</span>
              {game.genres.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  {index > 0 && <span className="me-1">,</span>}
                  <span>{genre.name}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {game.platforms && (
          <div className="d-flex flex-wrap col-md-6 mb-2 align-self-end justify-content-md-end">
            {game.platforms.map((platforms) => {
              return (
                <div className="me-1" key={platforms.platform.id}>
                  <span className="badge bg-secondary">
                    {platforms.platform.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="d-md-flex gap-2 mb-2">
        <div className="col-md-9">
          <img
            className="img-fluid rounded-2"
            src={game.background_image}
            alt={game.name}
          />
        </div>

        <div className="card col-md-3">
          <div className="card-body">
            <div className="mb-4">
              <h6 className="fw-light">Metacritic rating</h6>
              <span className="display-1">{game.rating}</span>
            </div>

            <h6 className="mb-1">ESRB Rating </h6>
            <div className="display-3 mb-4">
              {game.esrb_rating && (
                <div>
                  {game.esrb_rating.name}
                </div>
              )}
            </div>

            <div className="mb-4">
              <h6 className="fw-light">Release date</h6>
              <span className="display-3">{releaseDate}</span>
            </div>

            <div className="mb-4">
              <h6 className="fw-light">Average playtime:</h6>
              <span className="display-3">{game.playtime} Hours</span>
            </div>

            <PrimaryButton
              className="btn btn-primary mb-2"
              onClick={handleShow}
              ButtonText="Add to my games"
            />

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>Add {game.name} to your game collection</h2>
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
              <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button> */}
                <Button
                  className="btn btn-secondary"
                  onClick={handleClose}
                  ButtonText="Close"
                />
                {/* <Button type="submit" variant="primary" name="game_name" value={game.name} onClick={handleSubmit}>
                  Save Game
                </Button> */}
                <Button
                  type="submit"
                  name="game_name"
                  value={game.name}
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  ButtonText="Save game"
                />
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="d-md-flex gap-2">
        <div className="card col-md-9 mb-2">
          <div className="card-body">
            <h6 className="card-title mt-2 mb-3">Description</h6>
            <span className="card-text mb-4">{game.description_raw}</span>
          </div>
        </div>

        <div className="card col-md-3">
          <div className="card-body">
            <h6 className="card-title mb-1">Platforms </h6>
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

            <h6 className="card-title mb-1">Stores </h6>
            <div className="card-text mb-4">
              {game.stores && (
                <div>
                  {game.stores.map((stores) => {
                    return (
                      <a
                        href={`http://www.${stores.store.domain}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span key={stores.store.name}>
                          <span
                            key={stores.store.id}
                            className="badge bg-secondary me-1"
                          >
                            {stores.store.name}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

                        <div className="my-4">
              <h6 className="card-title mb-1">Developers </h6>
              {game.developers && (
                <div>
                  {game.developers.map((developer, index) => (
                      <span className="badge bg-secondary me-1">{developer.name}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
