const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const {createShareholder, sendVerificationEmail} = require('../../controllers/shareholderController')
var Shareholder = require('../../models/Shareholder');

// router.put('/', function (req, res, next) {
// email = req.body.email;
// data = {
// email,
// verification_nonce: crypto.randomBytes(32).toString('hex'),
// };
// createShareholder(data, (err, shareholder) => {
// if (err) {
// console.log(err);
// res.json({error: err.errmsg});
// } else {
// console.log(shareholder);
// sendVerificationEmail(shareholder);
// res.json({status: 'ok'});
// }
// })
// });

// router.put('/', function (req, res, next) {
// email = req.body.email;
// data = {
// email,
// verification_nonce: crypto.randomBytes(32).toString('hex'),
// };
// createShareholder(data, (err, shareholder) => {
// if (err) {
// console.log(err);
// res.json({error: err.errmsg});
// } else {
// console.log(shareholder);
// sendVerificationEmail(shareholder);
// res.json({status: 'ok'});
// }
// })
// });



router.put('/:id', function (req, res, next) {
    console.log(req.params)
    console.log(req.body)
    Shareholder.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, shareholder) {
        if (err) throw next(err);
        if (req.body.email) {
            sendVerificationEmail(shareholder);
        }
        res.json({message: "OK"});
    });

});

router.post('/', function (req, res, next) {
    console.log(req.body);
    if (req.body.type_reg && req.body.type_reg === 1) {
        // //const id_sh = response.data.id ? response.data.id : "";
        // const nonce = {verification_nonce: crypto.randomBytes(32).toString('hex')};
        // //req.body.id_sh = id_sh;
        // Shareholder.create(Object.assign(req.body, nonce), function (err, post) {
        //     if (err) throw next(err);
        //     res.json({message: "OK", id: post._id});
        // });
        let url = "http://fpt-agm.k8s.bcnfpt.com/verify?name=" + req.body.name + '&cmt=' + req.body.id;
        try {
            axios.get(encodeURI(url))
                .then(response => {
                    try {
                        console.log(response.data);
                        if (response.data.result === 0) {
                            const id_sh = response.data.id ? response.data.id : "";
                            const nonce = {verification_nonce: crypto.randomBytes(32).toString('hex')};
                            req.body.id_sh = id_sh;
                            Shareholder.create(Object.assign(req.body, nonce), function (err, post) {
                                if (err) throw next(err);
                                res.json({message: "OK", id: post._id});
                            });
                        } else {
                            res.json({message: "Not OK"});
                        }
                    } catch (e) {
                        console.log(error);
                        res.json({message: "Not OK"});
                    }

                })
                .catch(error => {
                    res.json({message: "Not OK"});
                    //console.log(error);
                });
        } catch (err) {
            res.json({message: "Not OK"});
            console.error("GG", err);
        }
    } else {
        let url = "http://fpt-agm.k8s.bcnfpt.com/verify?name=" + req.body.name + '&cmt=' + req.body.id;
        try {
            axios.get(encodeURI(url))
                .then(response => {
                    try {
                        console.log(response.data);
                        let type_p, type_v; //personal, vietnam
                        if (req.body.type_sh == 1) {
                            type_p = 1;
                            type_v = 1;
                        }
                        if (req.body.type_sh == 2) {
                            type_p = 1;
                            type_v = 0;
                        }
                        if (req.body.type_sh == 3) {
                            type_p = 0;
                            type_v = 1;
                        }
                        if ((response.data.result === 0 && response.data.personal === type_p && response.data.vietnam === type_v) || (response.data.result === 0 && response.data.personal === type_p && req.body.type_sh == 3)) {
                            const id_sh = response.data.id ? response.data.id : "";
                            const nonce = {verification_nonce: crypto.randomBytes(32).toString('hex')};
                            req.body.id_sh = id_sh;
                            Shareholder.create(Object.assign(req.body, nonce), function (err, post) {
                                if (err) throw next(err);
                                res.json({message: "OK", id: post._id, id_sh: id_sh});
                            });
                        } else {
                            res.json({message: "Not OK"});
                        }
                    } catch (e) {
                        console.log(error);
                        res.json({message: "Not OK"});
                    }

                })
                .catch(error => {
                    res.json({message: "Not OK"});
                    //console.log(error);
                });
        } catch (err) {
            res.json({message: "Not OK"});
            console.error("GG", err);
        }

    }
   
});
router.get('/', (req,res) => {
    Shareholder.find({}, function (err, data) {
        if (err) {
            res.send("Getting errors")
            next()
        }
        else {
            res.json(data)
        }
    })
})


module.exports = router;
