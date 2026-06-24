
const mongoose = require("mongoose");
const Station = require("../models/Station");
const Connection = require("../models/Connection");
const findShortestPath = require("../services/dijkstraServices");


exports.getShortestRoute = async (req,res) => {
    try{
        const {sourceStation, destinationStation} = req.body;

        if(!sourceStation || !destinationStation){
            return res.status(400).json({
                success:false,
                message:"please provide source and destination stations",
            })
        }

        if(!mongoose.isValidObjectId(sourceStation) || 
            !mongoose.isValidObjectId(destinationStation)) {
                return res.status(400).json({
                success:false,
                message:"Invalid station Id",
            })
        }

        if(sourceStation===destinationStation){
            return res.status(400).json({
                success:false,
                message:"source and destination acnnot be same",
            })
        }

        const stations = await Station.find();

        const connections = await Connection.find()
                                    .populate("fromStation")
                                    .populate("toStation");
        
        const sourceExists = stations.some(
            (station) => station._id.toString()===sourceStation
        )

        const destinationExists = stations.some(
            (station) => station._id.toString()===destinationStation
        )

        if (!sourceExists || !destinationExists) {
            return res.status(404).json({
                status: 404,
                message: "Source or destination station not found",
            });
        }


        const result = findShortestPath(
            stations,
            connections,
            sourceStation,
            destinationStation
        )

        if(result.path.length===0){
            return res.status(404).json({
                success:false,
                message:"No route exists "
            })
        }

        const path = result.path.map((stationId) => {
            const station = stations.find(
                (item) => item._id.toString()===stationId
            )

            return {
            _id:station._id,
            name:station.name,
            code:station.code,
            line:station.line,
            }

        })

        return res.status(200).json({
            success:true,
            message:"Shortest route found",
            data: {
                distance : result.distance,
                stops:path.length-1,
                path,
            }
        })
    }

    catch(error){
        console.log("error", error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}