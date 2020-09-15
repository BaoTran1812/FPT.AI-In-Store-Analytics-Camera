const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const currentPageSchema = new Schema({
   currentPage : {type: String}
})

CurrentPage = mongoose.model("currentPage", currentPageSchema)
module.exports = CurrentPage