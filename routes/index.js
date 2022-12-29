var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//Get home page
router.get("/", function (req, res, next) {
  res.send({ message: "hellooo" });
});

module.exports = router;
