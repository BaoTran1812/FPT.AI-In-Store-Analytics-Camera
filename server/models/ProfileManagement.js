const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  //https://www.npmjs.com/package/bcryptjs
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    id : { type: String},
    id_prob : { type: String},
    name : { type: String},
    name_prob : { type: String},
    dob : { type: String},
    dob_prob : { type: String},
    sex : { type: String},
    sex_prob : { type: String},
    nationality : { type: String},
    nationality_prob : { type: String},
    home : { type: String},
    home_prob : { type: String},
    address : { type: String},
    address_prob : { type: String},
    type_new : { type: String},
    address_entities : {
        province : String,
        district : String,
        ward : String,
        street : String
    },
    doe :{ type: String},
    doe_prob : { type: String},
    type : { type: String},
    face : { type: String},
    cropped_idcard : { type: String},
    ethnicity : { type: String},
    ethnicity_prob : { type: String},
    religion : { type: String},
    religion_prob : { type: String},
    features : { type: String},
    features_prob : { type: String},
    issue_date : { type: String},
    issue_date_prob : { type: String},
    issue_loc : { type: String},
    issue_loc_prob : { type: String},
    isMatch : { type: Boolean},
    similarity : { type: Number},
    creator_ip : { type: String},
    creator_hostname : { type: String},
    upload_id : { type: String},
    upload_name : { type: String},
    image_path_id_front : { type: String},
    image_path_id_back : { type: String},
    image_path_face : { type: String},
    image_path_id_front_cropped : { type: String},
    created_time : { type: Date},
    updated_time :{ type: Date},
});

ProfileManagement = mongoose.model('ekyc_results', ProfileSchema);
module.exports = ProfileManagement;

