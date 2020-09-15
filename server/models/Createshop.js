const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const createShopSchema = new Schema({
    shopName : {type: String},
    cameraNum: {type: String},
    x: {type: String},
    y: {type: String},
    a: {type: String},
    b: {type: String},
    file : {type: String},
    image: {type: String}
})

Createshop = mongoose.model("createShop", createShopSchema)
module.exports = Createshop