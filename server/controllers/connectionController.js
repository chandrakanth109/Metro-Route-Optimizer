
const Connection = require("../models/Connection");
const Station = require("../models/Connection");

exports.createConnection = async (req,res) => {
    try {
        const {fromStation, toStation, distance, line} = req.body;

        if(!fromStation || !toStation || !distance || !line) {
            return res.status(400).json({
                success:false,
                message:"Please fill all fields",
            })
        }

        if(fromStation === toStation){
            return res.status(400).json({
                success:false,
                message:"From station and to station should be different",
            })
        }

        const connection = await Connection.create({
            fromStation,
            toStation,
            distance,
            line,
        })

        return res.status(200).json({
            success:true,
            message:"Connection create successfully",
            data: connection,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
};

exports.getConnections = async (req, res) => {
  try {
    const connections = await Connection.find()
      .populate("fromStation", "name code line x y")
      .populate("toStation", "name code line x y");

    return res.status(200).json({
      success:true,
      message: "Connections fetched successfully",
      count: connections.length,
      data: connections,
    });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

exports.updateConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const { fromStation, toStation, distance, line } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success:false,
        message: "Invalid connection ID",
      });
    }

    if (!fromStation || !toStation || !distance || !line) {
      return res.status(400).json({
        success:false,
        message: "Please fill all fields",
      });
    }

    if (
      !mongoose.isValidObjectId(fromStation) ||
      !mongoose.isValidObjectId(toStation)
    ) {
      return res.status(400).json({
        success:false,
        message: "Invalid station ID",
      });
    }

    if (fromStation === toStation) {
      return res.status(400).json({
        success:false,
        message: "From station and to station cannot be the same",
      });
    }

    const stationCount = await Station.countDocuments({
      _id: { $in: [fromStation, toStation] },
    });

    if (stationCount !== 2) {
      return res.status(404).json({
        success:false,
        message: "One or both stations were not found",
      });
    }

    const connection = await Connection.findByIdAndUpdate(
      id,
      { fromStation, toStation, distance, line },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("fromStation", "name code line")
      .populate("toStation", "name code line");

    if (!connection) {
      return res.status(404).json({
        success:false,
        message: "Connection not found",
      });
    }

    return res.status(200).json({
      success:true,
      message: "Connection updated successfully",
      data: connection,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success:false,
        message: "Invalid connection ID",
      });
    }

    const connection = await Connection.findByIdAndDelete(id);

    if (!connection) {
      return res.status(404).json({
        success:false,
        message: "Connection not found",
      });
    }

    return res.status(200).json({
      success:false,
      message: "Connection deleted successfully",
      data: connection,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};