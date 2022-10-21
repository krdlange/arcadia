import React, { useState } from "react";
import { Link } from "react-router-dom";


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Search() {
  const [input, setInput] = useState(""); //searchbox input
  const [games, setGames] = useState({}); //API result
  const [myList, setMyList] = useState({  //save game to list
    gameId: "",
    status: ""
  });

//get results of input from API -3
  const searchGame = async () => {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&search=${input}&page=1&page_size=16`
    );
    const data = await response.json();
    setGames(data);
  };

  //handle changes in searchbox input -1
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  //handle click/submit of searchbox input -2
  const handleSubmit = (event) => {
    event.preventDefault();
    searchGame(input); //call API to search input
  };

  //add a game to my database - 4
  const addToList = (event, gameElement) => {
    event.preventDefault();
    myList.gameId = gameElement.id;
    // myList.gameStatus = {} -LAST EDITED HERE (how to add game status based on selection from modal/dropdown?)
    setMyList({...myList});
    // console.log(gameElement.id);
    // console.log(myList);
    addGame(myList);
  };

  //post the id to my database - 5
  const addGame = async () => {
    const response = await fetch("/mygames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myList) //send state of myList
    });
    const json = await response.json();
    console.log(json);
    setMyList(json); //store response to state
  }

  return (
    <div className="container">

      <form className="mt-4 mb-4" onSubmit={handleSubmit}>
        <div>
          <label>
            Search game:
            <input value={input} onChange={(e) => handleInputChange(e)}></input>
          </label>
          <button type="submit">Submit</button>
        </div>
      </form>

      {games.results && (
        <div className="d-flex flex-wrap row ">
          {games.results.map((gameElement, index) => ( 
            <div className="col-4 card" key={gameElement.id}>
              <div className="card-body" key={index}>

                <div>
                  <img
                    key={index} className="card-img-top"
                    src={gameElement.background_image}/>
                </div>

                <div className="card-title" key={index}>
                  {gameElement.name}
                </div>

                <div>
                {/* <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog> */}
    
                  <button
                    onClick={(e) => addToList(e, gameElement)}
                    className="btn btn-primary btn-sm">
                    Add to list
                  </button>
                </div>

                <div> 
                  {/* If user clicks on the result they are linked to gameprofile using the id*/}
                  <Link to={`/gameprofile/${gameElement.id}`}>
                    <button
                      className="btn btn-primary btn-sm">
                      View Game
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
