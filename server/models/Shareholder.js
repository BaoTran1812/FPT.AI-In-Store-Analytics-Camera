const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  //https://www.npmjs.com/package/bcryptjs
const Schema = mongoose.Schema;
const crypto = require('crypto');
const isEmpty = require('../validation/is-empty');

const shareholderSchema = new Schema({
    id: {type: String},
    id_prob: {type: String},
    name: {type: String},
    name_prob: {type: String},
    dob: {type: String},
    dob_prob: {type: String},
    home: {type: String},
    home_prob: {type: String},
    address: {type: String},
    address_prob: {type: String},
    image_id_front: {type: String},
    image_face: {type: String},
    type_sh: {type: Number},
    ocr_init: {type: String},
    type_reg: {type: Number},
    type_online: {type: Number},
    phone: {type: String},
    email: {type: String},
    activated: {type: Boolean, default: false},
    verification_sent_count: {type: Number, default: 0},
    verification_nonce: {type: String},
    created_time: {type: Date},
    updated_time: {type: Date},
    id_sh: {type: String},
    language: {type: String},
    sentVoteEmail: {type: Boolean, default: false},
    is_match: {type: Boolean},
    image_root: {type:String},
    imageSrc: {type: String}
});

Shareholder = mongoose.model('shareholders', shareholderSchema);
module.exports = Shareholder;

