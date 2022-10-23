require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "game_collection",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if EXISTS `game_collection`;CREATE TABLE `game_collection`(`gameId` INT UNSIGNED NOT NULL AUTO_INCREMENT,`gameName` CHAR(255) NOT NULL,`myRating` CHAR(255) NOT NULL,`dateAdded` CHAR(255) NOT NULL,`status` CHAR(255) NOT NULL,`api_id` CHAR(255) NOT NULL, `gameImg` CHAR(255) NOT NULL, PRIMARY KEY (gameId));";
    
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `game_collection` was successful!");

    console.log("Closing...");
  });

  con.end();
});
