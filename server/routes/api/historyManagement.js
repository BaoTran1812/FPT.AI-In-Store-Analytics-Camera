var express = require('express');
var router = express.Router();
var HistoryManagement = require('../../models/HistoryManagement');

router.get('/', function (req, res, next) {
    HistoryManagement.find({}).sort({updated_time: 'desc'}).exec(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.get('/:id', function (req, res, next) {
    HistoryManagement.findOne({
        $and: [
            {'_id': req.params.id}
        ]
    }).exec((err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function (req, res, next) {
    req.body.user_id = req.user._id;
    req.body.edit_time = Date.now();
    HistoryManagement.create(req.body, function (err, post) {
        if (err) throw next(err);
        res.json({message: "OK", data: post});
    });
});

/* UPDATE KEYWORD */
router.put('/:id', function (req, res, next) {
    HistoryManagement.findByIdAndUpdate({_id: req.params.id}, req.body, function (err) {
        if (err) throw next(err);
        res.json({message: "OK"});
    });

});

/* DELETE KEYWORD */
router.delete('/:id', function (req, res, next) {
    HistoryManagement.findOne({_id: req.params.id}).remove(function (err, data) {
        //updateRedis(req.query.user_id, res, next);
        if (err) throw next(err);
        res.json(data);
    });
});

module.exports = router;