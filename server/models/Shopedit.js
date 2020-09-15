const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editShopSchema = new Schema({
   store: {type: Object}
})

Shopedit = mongoose.model("editShop", editShopSchema)
module.exports = Shopedit