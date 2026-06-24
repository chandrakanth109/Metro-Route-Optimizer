const express = require("express");
const { createStation, getStations, updateStation, deleteStation } = require("../controllers/stationController");

const router = express.Router();

router.post("/createStation", createStation);
router.get("/getStations", getStations);
router.put("/updateStation/:id", updateStation);
router.delete("/deleteStation/:id", deleteStation);

module.exports = router;