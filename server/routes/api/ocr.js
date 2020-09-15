const express = require('express');
const router = express.Router();
var FormData = require('form-data');
const fetch = require('node-fetch');

router.post('/', function (req, res, next) {
    try {
        let data = new FormData();
        data.append('image_base64', req.body.data.replace('data:image/jpeg;base64,', "").replace('data:image/png;base64,', "").replace('data:image/jpg;base64,', ""));
        //console.log(data);
        fetch('https://api.fpt.ai/vision/idr/vnm', {
            method: 'POST',
            headers: {
                // 'Authorization': `bearer ${token}`,
                'api_key': 'DMP@2019'
            },
            body: data
        })
            .then(response => response.json())
            .then(resData => {
                try {
                    console.log(resData);
                    if (resData.data[0]) {
                        res.json({message: "OK", data: resData.data[0]});
                    } else {
                        res.json({message: "Not OK"});
                    }
                } catch (e) {
                    res.json({message: e});
                }

            })
            .catch((error) => {
                res.json({message: error});
            });

    } catch (e) {
        res.json({message: "Not OK"});
    }


});

module.exports = router;
