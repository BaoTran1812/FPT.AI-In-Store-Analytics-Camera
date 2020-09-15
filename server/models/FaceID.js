const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const faceIDSchema = new Schema({
   image_root: {type:String},
   imageSrc: {type: String},
   
})

FaceID = mongoose.model("faceID", faceIDSchema)
shareholder = require("./Shareholder")
module.exports = FaceID