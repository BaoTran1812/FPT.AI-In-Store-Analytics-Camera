var express = require("express");
var router = express.Router();
var Shopedit = require("../../models/Shopedit");
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  Shopedit.create(req.body, function (err, post) {
    if (err) throw next(err);
    if (!err) {
      res.json({ message: "OK" });
    } else {
      res.json({ message: "BAD" });
    }
  });
});

router.get("/", (req, res) => {
  Shopedit.find({}, function (err, data) {
    if (err) {
      res.send("Getting errors");
      next();
    } else {
      res.json(data);
    }
  });
});

router.delete('/', function (req, res) {
  Shopedit.remove({}, function(err) {
    if (err) {
      console.log(err)
      return res.status(500).send()
    }

    return res.status(200).send()
  })
});

module.exports = router