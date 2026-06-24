

const mongoose = require("mongoose");

const connectSchema = new mongoose.Schema({
    fromStation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Station",
        required:true,
    },

    toStation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Station",
        required:true,
    },

    distance:{
        type:Number,
        required:true,
        min:0.1,
    },

    line:{
        type:String,
        required:true,
        trim:true,
    }
},
{
    timestamps:true, 
})

module.exports = mongoose.model("Connection", connectSchema);