const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const formSchema = new Schema({
    logo: {type: String},
    logoTitle: {type: String},
    programTitle: {type: String},
    location: {type: String},
    program: {type: String},
    doc:{type: String},
    phoneNum:{type: String}
})

Form = mongoose.model("form", formSchema)
module.exports = Form