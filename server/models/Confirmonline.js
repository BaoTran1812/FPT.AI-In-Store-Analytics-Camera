const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const shareHolder = require("./Shareholder")

const confirmonlineSchema = new Schema({
    stocks : {type: String},
    total_stocks: {type: String},
    opinion: {type: String},
    opinion1: {type: String},
    opinion2: {type: String},
    opinion3: {type: String},
    opinion4: {type: String},
    opinion5: {type: String},
    id_prob: {type: String},
    image_root: {type: String},
    imageSrc: {type:String},
    id: {type: String},
    name: {type: String},
    dob: {type: String},
    town: {type: String},
    address: {type: String},
    // shareholder: [{type: mongoose.Schema.Types.id, ref: 'Shareholder'}]
    
})

Confirmonline = mongoose.model("confirmonline",confirmonlineSchema)
module.exports = Confirmonline