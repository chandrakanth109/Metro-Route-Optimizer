const express = require("express");
const { createConnection, getConnections, updateConnection, deleteConnection } = require("../controllers/connectionController");
const { route } = require("./stationRoute");
const router = express.Router();

router.post("/createConnection", createConnection);
router.get("/getConnections", getConnections);
router.put("updateConnection/:id", updateConnection);
router.delete("/deleteConnection/:id", deleteConnection);

module.exports = router;

