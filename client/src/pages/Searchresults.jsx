import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/PrimaryButton";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Searchresults(props) {
  const [games, setGames] = useState({}); //API result
  const { id } = useParams(); //api id
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  const [input, setInput] = useState({
    api_id: `${id}`,
    user_id: "",
    status: "",
    my_rating: "",
  });

  //get location of searchbar input
  const location = useLocation();
  console.log(location.state);

  //render search result
  useEffect(() => {
    searchGame();
  }, []);

  //modal ui
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //call api and store result to games
  const searchGame = async () => {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&search=${location.state}&page=1&page_size=16`
    );
    const data = await response.json();
    setGames(data);
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addGameToCollection();
  };

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

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="mb-4 mt-4">Search results</h1>
      </div>
      {games.results && (
        <div className="row">
          <h5 className="mt-4 mb-4">
            We found {games.count} results related to your query: "
            {location.state}"
          </h5>
          {games.results.map((gameElement, index) => (
            <div className="col-md-4 mb-4 text-center" key={gameElement.id}>
              <div className="card" key={index}>
                <div className="card-body">
                  <img
                    height="280"
                    key={index}
                    className="card-img-top"
                    src={gameElement.background_image}
                    alt={gameElement.name}
                  />
                </div>

                <div className="card-title" key={index}>
                  {gameElement.name}
                </div>

                <div className="d-flex mt-1 mb-2 justify-content-center">
                  <div className="mb-2 me-2">
                    {/* HANDLE THE GAME BY OPENING MODAL - COPY DATA TO MODAL */}
                    {/* <button
                      onClick={(e) => {
                        handleShow(e, gameElement);
                        setModalData(gameElement);
                      }}
                      className="btn btn-primary btn-m"
                    >
                      Add to list
                    </button> */}
                    {/* <Button
                      className="btn btn-primary btn-m"
                      ButtonText="Add to list"
                      onClick={(e) => {
                        handleShow(e, gameElement);
                        setModalData(gameElement);
                      }}
                    /> */}
                    <div className="mt-4">
                      {/* <Button
                        className="btn btn-primary"
                        onClick={handleShow}
                        ButtonText="Add to my games"
                      />

                      <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>

                        <AddGameForm />
                        </Modal.Header>
                        <Modal.Footer>
                          
                          <Button
                            className="btn btn-secondary"
                            onClick={handleClose}
                            ButtonText="close"
                          />
                        
                          <Button
                            type="submit"
                            name="game_name"
                            value={gameElement.name}
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            ButtonText="save game"
                          />
                        </Modal.Footer>
                      </Modal> */}
                    </div>
                  </div>

                  <div className="mb-2 me-2">
                    {/* If user clicks on the result they are linked to gameprofile using the id*/}
                    <Link to={`/gameprofile/${gameElement.id}`}>
                      <Button
                        className="btn btn-primary btn-m"
                        ButtonText="View Game"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
