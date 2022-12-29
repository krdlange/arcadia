var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// router.get("/", function(req, res, next) {
//     res.send("API is working properly");
// });

/* GET game collection. */
router.get("/", (req, res) => {
    db("SELECT * FROM game_collection;")
      .then((results) => {
        res.send(results.data);
      })
      .catch((err) => res.status(500).send(err));
  });


  //POST game to collection
  router.post("/", async (req, res) => {
    let {api_id, user_id, status, my_rating} = req.body;
    let sql = (`INSERT INTO game_collection (api_id, user_id, status, my_rating) VALUES ('${api_id}', '${user_id}','${status}','${my_rating}');`);
  
    try {
      await db(sql); //action
      let result = await db("SELECT * FROM game_collection"); //result
      let myGames = result.data;
      res.send(myGames);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
 //EDIT rating
//   router.put("/gamecollection/:id", async (req, res) => {
//     let { id } = req.params;
//     let {api_id, user_id, status, my_rating} = req.body;
//     let sql = `UPDATE game_collection SET gameName = '${gameName}', myRating = '${myRating}', dateAdded = '${dateAdded}', status = '${status}', api_id = '${api_id}' WHERE gameId = ${id}`;
  
//     try {
//       let results = await db(
//         `SELECT * FROM game_collection WHERE gameId = ${id}`
//       );
//       let myGames = results.data;
//       if (myGames.length === 0) {
//         res.status(404).send({ error: "No games found" });
//       } else {
//         await db(sql);
//         results = await db(`SELECT * FROM game_collection`);
//         myGames = results.data;
//         res.send(myGames);
//       }
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });
  
//   router.delete("/mygames/:id", async (req, res) => {
//     let { id } = req.params;
  
//     try {
//       let results = await db(
//         `SELECT * FROM game_collection WHERE gameId = ${id}`
//       );
//       let myGames = results.data;
  
//       if (myGames.length === 0) {
//         res.status(404).send({ error: "No games found" });
//       } else {
//         await db(`DELETE FROM game_collection WHERE gameId = '${id}'`);
//         results = await db(`SELECT * FROM game_collection`);
//         myGames = results.data;
//         res.send(myGames);
//       }
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });

module.exports = router;
