var express = require('express');
var router = express.Router();
var FaceID = require('../../models/FaceID');
const mongoose = require('mongoose')


router.post('/', (req,res,next) => {
    console.log(req.body)
    FaceID.create(req.body, function (err, post) {
    if (err) throw next(err);
    if (!err) {
        res.json({message: "OK"});
    }
    else {
        res.json({message: "BAD"});
    }
    });
    })

router.get('/', (req,res) => {
    FaceID.find({}, function (err, data) {
        if (err) {
            res.send("Getting errors")
            next()
        }
        else {
            res.json(data)
        }
    })
})

module.exports = router