import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Gameprofile() {
  const [game, setGame] = useState([]); //fetch game info
  const { id } = useParams(); //store id from search page
  const [gameStatus, setGameStatus] = useState({
    gameId: `${id}`,
    status: "",
  });

  useEffect(() => {
    //1 - fetch game info & setData to show
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`, {
      method: "GET",
    });
    const gameInfo = await response.json();
    console.log(gameInfo);
    setGame(gameInfo);
  };

  // 2- on click store info into gameStatus & call addGame to post gameStatus variables into the database
  const handleChange = (event) => {
    const { name, value } = event.target;

    //first write a route to put the change - put game
    //res

    setGameStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(gameStatus);

  //  3- post on database
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
    setGameStatus(json); //set status of game content
  };

  //4 - make sure to keep the gameStatus on different routes

  return (
    <div>
      <div className="container d-flex  mt-4">
        <div className="col-md-4 me-4">
          <img className="img-fluid" src={game.background_image} />
        </div>

        <div>
          <h1>{game.name}</h1>
          <span>Release date: {game.released}</span>
          {game.genres && (
            <div>
              {game.genres.map((genres) => {
                return (
                  <div key={genres.id}>
                    <span className="badge bg-secondary">{genres.name}</span>
                  </div>
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
              <option value="isComplete">Done</option>
              <option value="toPlay">To Play</option>
              <option value="currentlyPlaying">Currently Playing</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container d-flex mt-4">
        <div className="row">
          <div className="card col-8 me-3">
            <div className="card-body">
              <h5 className="card-title">Description</h5>
              <p className="card-text">{game.description_raw}</p>

              <h5 className="card-title">Developers </h5>
              <div className="card-text">
                {game.developers && (
                  <div>
                    {game.developers.map((developers) => {
                      return (
                        <div key={developers.name}>
                          <span className="badge bg-secondary">
                            {developers.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <h5 className="card-title">Stores </h5>
              <div className="card-text">
                {game.stores && (
                  <span>
                    {game.stores.map((stores) => {
                      return (
                        <a href={`http://www.${stores.store.domain}`}target="_blank">
                        <span className="me-2" key={stores.store.name}>
                          <h5 className="badge bg-secondary">
                            {stores.store.name}
                          </h5>
                        </span></a>
                      );
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          

          <div className="card col-3">
            <div className="card-body">
              <h5 className="card-title">Metacritic rating </h5>
              <p className="card-text">{game.rating}</p>

              <h5 className="card-title">Platforms </h5>
              <div className="card-text">
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


              <h5 className="card-title">ESRB Rating </h5>
              <div className="card-text">
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
