import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Gameprofile() {
  const [game, setGame] = useState([]); //to store fetch response game info
  const { id } = useParams(); //store id from search page
  const [gameStatus, setGameStatus] = useState({
    gameId: `${id}`,
    status: "",
  });

  //call fetchGame after render
  useEffect(() => {
    fetchGame();
  }, []);

  // useEffect(() => {
  //   postStatus();
  // }, [setGameStatus])

  //store fetch response to setGame
  const fetchGame = async () => {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`, {
      method: "GET",
    });
    const gameInfo = await response.json();
    console.log(gameInfo);
    setGame(gameInfo);
  };

  //1 - check if id is already in database, if it exists, display that status if not show default value (?)
  //2 - on change of dropdown selection - store each event to gameStatus
  //3 - call a router.post function if selection is made
  //4 - call a router.put function if it already exists
  //5 - call a router.delete if user selects default option
  const handleChange = (event) => {
    const { name, value } = event.target;

    //

    setGameStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  //router.post to database
  const addGame = async () => {
    const response = await fetch("/mygames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setGameStatus),
    });
    const json = await response.json();
    console.log(json);
    setGameStatus(json);
  };


  return (
    <div>
      <div className="container d-flex  mt-4">
        <div className="col-md-4 me-4">
          <img className="img-fluid" src={game.background_image} />
        </div>

        <div>
          <h1>{game.name}</h1>
          <div><h5>Release date: {game.released}</h5></div>
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
            <select
              name="status"
              className="form-select"
              onChange={(e) => handleChange(e)}
            >
              <option selected>Add to collection</option>
              <option value="Done Playing">Done</option>
              <option value="To Play">To Play</option>
              <option value="Currently playing">Currently Playing</option>
            </select>
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
                        <a href={`http://www.${stores.store.domain}`}target="_blank">
                        <h5 key={stores.store.name}>
                          <span className="badge bg-secondary me-2">
                            {stores.store.name}
                          </span>
                        </h5></a>
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
