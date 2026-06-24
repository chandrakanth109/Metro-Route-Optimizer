
const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    line:{
        type:String,
        required:true,
        trim:true,
    },
    x:{
        type:Number,
        required:true,
    },
    y:{
        type:Number,
        required:true,
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("Station", stationSchema);