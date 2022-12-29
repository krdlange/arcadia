import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Searchresults(props) {
  const [games, setGames] = useState({}); //API result
  // const [myList, setMyList] = useState({
  //   //save game to list
  //   status: "",
  //   api_id: ""
  // });

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

  return (
    <div className="container">
      <div className="mt-4">
        <h1>Search results</h1>
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
                  />
                </div>

                <div className="card-title" key={index}>
                  {gameElement.name}
                </div>

                <div className="d-flex mt-1 mb-2 justify-content-center">
                  <div className="mb-2 me-2">
                    {/* HANDLE THE GAME BY OPENING MODAL - COPY DATA TO MODAL */}
                    <button
                      onClick={(e) => {
                        handleShow(e, gameElement);
                        setModalData(gameElement);
                      }}
                      className="btn btn-primary btn-m"
                    >
                      Add to list
                    </button>
                  </div>

                  <div className="mb-2 me-2">
                    {/* If user clicks on the result they are linked to gameprofile using the id*/}
                    <Link to={`/gameprofile/${gameElement.id}`}>
                      <button className="btn btn-primary btn-m">
                        View Game
                      </button>
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