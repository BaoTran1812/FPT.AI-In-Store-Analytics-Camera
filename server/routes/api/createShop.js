var express = require("express");
var router = express.Router();
var Createshop = require("../../models/Createshop");
const mongoose = require("mongoose");
const {ObjectID} = require('mongodb')

router.post("/", (req, res, next) => {
  Createshop.create(req.body, function (err, post) {
    if (err) throw next(err);
    if (!err) {
      // res.json({ message: "OK" });
      Createshop.count({}, function (err, count) {
        res.json(count)
      })
    } else {
      res.json({ message: "BAD" });
    }
  });
});

router.get("/", (req, res) => {
    Createshop.find({}, function (err, data) {
      if (err) {
        res.send("Getting errors");
        next();
      } else {
        res.json(data);
      }
    });
  });

router.put('/:id', function (req, res, next) {
  Createshop.findByIdAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) throw next(err);
      res.send(req.body)
    });

});

router.delete('/:id', function (req, res) {
  Createshop.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err)
      return res.status(500).send()
    }

    return res.status(200).send()
  })
});

module.exports = router;