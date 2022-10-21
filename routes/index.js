var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'hellooo' });
});

router.get("/mygames", (req, res) => {
  db("SELECT * FROM game_collection;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});

//post game data
router.post("/mygames", async function (req, res) {
  //declare body
  const { gameId, status} = req.body; 
  //declare sql
  const sql = (`INSERT INTO game_collection (gameId, status) VALUES ('${gameId}', '${status}')`);

  try {
    await db(sql);
    let result = await db("SELECT * FROM game_collection"); //show game collection
    let myGames = result.data;
    res.send(myGames);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("")

module.exports = router;

