
const Station = require("../models/Station");
const Connection = require("../models/Connection");
const { default: mongoose } = require("mongoose");

exports.createStation = async(req,res) => {
    try{
        console.log("req body", req.body);

        const {name,code,line,x,y} = req.body;

        if(!name || !code || !line || x===undefined || y===undefined) {
            return res.staus(400).json({
                success:false,
                message:"Pls fill all fields",
            });
        }

        const station = await Station.create({
            name,
            code,
            line,
            x,
            y
        });

        return res.status(201).json({
            success:true,
            messsage:"Station created successfully",
            data:station,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

exports.getStations = async(req,res) => {
    try{
        const stations = await Station.find().sort({name:1});
        
        return res.status(200).json({
            success:true,
            message:"Stations fetched successfully",
            count:stations.length,
            data:stations,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.updateStation = async (req,res) => {
    try {
        const id=req.params;
        const {name, code, line, x, y} = req.body;

        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                status:false,
                message:"Invalid station Id"
            })
        }

        const station = await Station.findByIdAndUpdate(
            id,
            {name, code, line, x, y},
            {
                new: true,
            }
        );

        if(!station){
            return res.status(400).json({
                success:false,
                message:"Station not found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Station updated successfully",
            data:station,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success:false,
        message: "Invalid station ID",
      });
    }

    const station = await Station.findByIdAndDelete(id);

    if (!station) {
      return res.status(404).json({
        success:false,
        message: "Station not found",
      });
    }

    // Remove connections that belong to the deleted station.
    await Connection.deleteMany({
      $or: [{ fromStation: id }, { toStation: id }],
    });

    return res.status(200).json({
      success:true,
      message: "Station and related connections deleted successfully",
      data: station,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};