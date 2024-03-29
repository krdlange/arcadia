
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Mostanticipatedgames() {
    const [games, setGames] = useState({}); //API result

    useEffect(() => {
        searchGame();
      }, []);

      const searchGame = async () => {
        const response = await fetch(
          `${BASE_URL}?dates=2019-09-01,2019-09-30&platforms=18,1,7&key=${API_KEY}&page=1&page_size=6`
        );
        const data = await response.json();
        setGames(data);
        console.log(data);
      };

    return (
    <div> 
        <div>
        <h3 className="mb-4">New Releases</h3>
            </div>     
        {games.results && (
        <div className="row">
          {games.results.map((gameElement, index) => (
            <div className="col-md-2 mb-4 text-center" key={gameElement.id}>
              <div className="card" key={index}>
                <div className="card-body">
                  <img
                    height="80"
                    key={index}
                    className="card-img-top"
                    src={gameElement.background_image}
                    alt={gameElement.name}
                  />
                </div>
                <Link to={`/gameprofile/${gameElement.id}`}>

                <div className="card-title" key={index}>
                  {gameElement.name}
                </div>
                </Link>

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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}</div>
  )
}
