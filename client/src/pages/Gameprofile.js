import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = "6ddd1b1c29db4d0c83299e345c9e198a";
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Gameprofile() {
  const [game, setGame] = useState([]); //fetch game info
  const { id } = useParams(); //store id from search page
  const [gameStatus, setGameStatus] = useState({
    gameId: `${id}`,
    status: ""
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

  console.log(gameStatus)

//  3- post on database
  const addGame = async () => {
    const response = await fetch("/mygames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(setGameStatus)
    });
    const json = await response.json();
    console.log(json);
    setGameStatus(json); //set status of game content
  }

  //4 - make sure to keep the gameStatus on different routes

  return (
    <div>
      <div className="col-md-4">
        <img className="img-fluid" src={game.background_image} />

        <select
          name="status"
          className="form-select"
          onChange={(e) => handleChange(e)}
        >
          {/* <option selected>Add to collection</option> */}

          <option value="isComplete">Done</option>
          <option value="toPlay">To Play</option>
          <option value="currentlyPlaying">Currently Playing</option>
        </select>

      </div>
      <div>{game.id}</div>
      <div>{game.name}</div>
      <div>{game.released}</div>

      {game.genres && (
        <div>
          {game.genres.map((genres) => {
            return (
              <div key={genres.id}>
                <h2>{genres.name}</h2>
              </div>
            );
          })}
        </div>
      )}
      <div>{game.description_raw}</div>
    </div>
  );
}
