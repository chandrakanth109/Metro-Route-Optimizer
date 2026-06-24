
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
)

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const db=require("./config/database");
db.connect();

const connectionRoute=require("./routes/connectionRoute")
app.use("/api/v1",connectionRoute);
const stationRoute=require('./routes/stationRoute');
app.use("/api/v1",stationRoute);
const routeRoute=require("./routes/routeRoute");
app.use("/api/v1", routeRoute)

app.listen(PORT, () => {
    console.log(`App is listing at ${PORT}`);
})

app.get("/", (req,res) => {
    res.status(200).json({
        success:true,
        message:"Metro Route Optimizer API is running",
    })
})
