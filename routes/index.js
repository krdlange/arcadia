var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//Get home page
router.get("/", function (req, res, next) {
  res.send({ message: "hellooo" });
});

// Get my list of games
router.get("/mygames", (req, res) => {
  db("SELECT * FROM game_collection;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//Post a game
router.post("/mygames", async function (req, res) {
  //declare body
  const { game_id, game_name, my_rating, api_id, user_id } = req.body;
  //declare sql
  const sql = `INSERT INTO game_collection (game_id, game_name, my_rating, api_id, user_id) VALUES ('${game_id}', '${game_name}', '${my_rating}','${api_id}','${user_id}')`;

  try {
    await db(sql);
    let result = await db("SELECT * FROM game_collection"); //show game collection
    let myGames = result.data;
    res.send(myGames);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//modify rating
router.put("/mygames/:id", async (req, res) => {
  let { id } = req.params;
  let { gameName, myRating, dateAdded, status, api_id } = req.body;
  let sql = `UPDATE game_collection SET gameName = '${gameName}', myRating = '${myRating}', dateAdded = '${dateAdded}', status = '${status}', api_id = '${api_id}' WHERE gameId = ${id}`;

  try {
    let results = await db(
      `SELECT * FROM game_collection WHERE gameId = ${id}`
    );
    let myGames = results.data;
    if (myGames.length === 0) {
      res.status(404).send({ error: "No games found" });
    } else {
      await db(sql);
      results = await db(`SELECT * FROM game_collection`);
      myGames = results.data;
      res.send(myGames);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/mygames/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let results = await db(
      `SELECT * FROM game_collection WHERE gameId = ${id}`
    );
    let myGames = results.data;

    if (myGames.length === 0) {
      res.status(404).send({ error: "No games found" });
    } else {
      await db(`DELETE FROM game_collection WHERE gameId = '${id}'`);
      results = await db(`SELECT * FROM game_collection`);
      myGames = results.data;
      res.send(myGames);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
