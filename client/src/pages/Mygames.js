import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Mygames() {
  const [myList, setMyList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    viewList();
  }, []);

  const viewList = async () => {
    const response = await fetch("/mygames");
    const list = await response.json();
    // console.log(list);
    setMyList(list);
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="mb-4 mt-4">My games</h1>

        {myList && (
          <div key={myList.gameId} className="d-flex flex-wrap row">
            {myList.map((gameElement, index) => (
              <div className="col-4 card" key={index}>
                <div className="card-body" key={index}>
                  <img
                    height="220"
                    className="card-img-top mb-2"
                    src={gameElement.gameImg}
                  />
                  <div className="card-title" key={index}>
                    <h3 key={gameElement.gameName}>{gameElement.gameName}</h3>
                </div>

                <div className="d-flex justify-content-between">
                    <div>
                    <span className="badge bg-success me-1">
                      Rating: {gameElement.myRating}
                    </span>
                    <span key={gameElement.status} className="badge bg-success">
                      {gameElement.status}
                    </span>
                  </div>
                  <div>
                    <button>
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  
                  </div>

              </div>

                </div>
              </div>
            ))}
          </div>

          
        )}
      </div>







      
    </div>
  );
}
