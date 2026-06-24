
const express = require("express");
const { route } = require("./stationRoute");
const { getShortestRoute } = require("../controllers/routeController");

const router = express.Router();

router.post("/getShortestRoute", getShortestRoute);

module.exports=router;