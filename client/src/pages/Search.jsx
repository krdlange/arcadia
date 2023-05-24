import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import PrimaryButton from "../components/PrimaryButton";
import Form from "react-bootstrap/Form";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export default function Search() {
  const [input, setInput] = useState(""); //searchbox input
  const [games, setGames] = useState({}); //API result
  // const [myList, setMyList] = useState({
  //   //save game to list
  //   status: "",
  //   api_id: ""
  // });
  const [modalData, setModalData] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //get results of input from API & store in setGames
  const searchGame = async () => {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&search=${input}&page=1&page_size=16`
    );
    const data = await response.json();
    setGames(data);
    console.log(data);
  };

  //handle changes in searchbox input
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

 //handle click/submit of searchbox input
  const handleSubmit = (event) => {
    event.preventDefault();
    searchGame(input); //call API to search input
    // console.log(input);
  };

//PART 1 above - search & result

 // handle change in modal dropdown
  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   setMyList.status((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

//PART 2 below - adjust the state of list, get status of game and api_id

  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   setMyList(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  //   // setMyList(event.target.value); // get only the value
  //   console.log(name, value); //send this to my list object
  // };

  // const handleClick = (event, value) => {
  //   event.preventDefault();
  //   const { name } = event.target;
  //   setMyList(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // //  console.log(event);
  //  console.log(name, value);
  //   addGame();  
  // }

 
  //handle the save click from modal
  // const addToList = (event) => {
  //   event.preventDefault();

    
  //   setMyList({ ...myList });
  //   // console.log(gameElement.id);
  //   // console.log(myList);
  //   addGame(myList);
  // };

  //PART 3 - post the myList object to my database 
  // const addGame = async () => {
  //   const response = await fetch("/mygames", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(myList), //send state of myList
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   setMyList(json); //store response to state
  // };

  return (
    <div className="container">
      
      <div className="d-flex justify-content-center mx-auto">
      <form className="mt-4 mb-4" onSubmit={handleSubmit}>
        <div className="m-4">
          <label>
            <h1>Search game</h1>
            <input className="form-control form-control" placeholder="Search..." value={input} onChange={(e) => handleInputChange(e)}></input>
          </label>
          <PrimaryButton className="btn btn-primary" type="submit">Submit</PrimaryButton>
        </div>
      </form>
      </div>

      {games.results && (
        <div className="d-flex flex-wrap row">
          {games.results.map((gameElement, index) => (
            <div className="col-md-4 card" key={gameElement.id}>
              <div className="card-body" key={index}>
                <div>
                  <img height="280"
                    key={index}
                    className="card-img-top"
                    src={gameElement.background_image}
                  />
                </div>

                <div className="card-title" key={index}>
                  {gameElement.name}
                </div>

                <div className="d-flex mt-4 justify-content-end"> 
                <div className="mb-2 me-2">
                

                {/* HANDLE THE GAME BY OPENING MODAL - COPY DATA TO MODAL */}
                  <PrimaryButton
                    onClick={(e) => {
                      handleShow(e, gameElement);
                      setModalData(gameElement);
                    }}
                    className="btn btn-primary btn-m"
                  >
                    Add to list
                  </PrimaryButton>
                </div>

                <div className="mb-2">
                  {/* If user clicks on the result they are linked to gameprofile using the id*/}
                  <Link to={`/gameprofile/${gameElement.id}`}>
                    <PrimaryButton className="btn btn-primary btn-m">
                      View Game
                    </PrimaryButton>
                  </Link>
                </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

{/* OPEN MODAL & with values of gamedata from modal data, then get values for setMyList */}

      {modalData && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {modalData.name} to my list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Set status
            <Form.Group>
              {/* also get the id of the clicked game */}
              {/* <Form.Select name="status" value={myList.status} onChange={(e, value) => handleChange(e, value)}> */}
              <Form.Select name="status">
                {/* <option>Open this select menu</option> */}
                
                <option value="isComplete">Done</option>
                <option value="toPlay">To Play</option>
                <option value="currentlyPlaying">Currently Playing</option>
              </Form.Select>
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <PrimaryButton variant="secondary" onClick={handleClose}>
              Close
            </PrimaryButton>
            {/* <Button name="api_id" variant="primary" onClick={e => handleClick(e, modalData.id)}> */}
            <PrimaryButton name="api_id">
              Save Changes
            </PrimaryButton>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
