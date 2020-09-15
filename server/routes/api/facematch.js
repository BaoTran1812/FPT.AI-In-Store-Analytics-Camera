const express = require('express');
const router = express.Router();
var FormData = require('form-data');
const fetch = require('node-fetch');
var fs = require('fs');
var Shareholder = require('../../models/Shareholder');


// function base64_decode(base64str, file) {
//     // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
//     var bitmap = new Buffer(base64str, 'base64');
//     // write buffer to file
//     fs.writeFileSync(file, bitmap);
//     console.log('******** File created from base64 encoded string ********');
// }

router.put('/:id', function (req, res, next) {
        // var base64Data = req.body.data.replace(/^data:image\/png;base64,/, "");
        // console.log(base64Data);
        // fs.writeFile("out.png", base64Data, 'base64', function (err) {
        //     console.log(err);
        //     console.log(2);
        // });
        var random_num = Math.random() * (100 - 1) + 1;
        let data = new FormData();
        var base64DataFile1 = req.body.file1.replace('data:image/jpeg;base64,', "").replace('data:image/png;base64,', "").replace('data:image/jpg;base64,', "");
        var base64DataFile2 = req.body.file2.replace('data:image/jpeg;base64,', "").replace('data:image/png;base64,', "").replace('data:image/jpg;base64,', "");
        var id_path = 'id' + random_num + '.png';
        var face_path = 'face' + random_num + '.png';
        require("fs").writeFile(id_path, base64DataFile1, 'base64', function (err) {
            if (err) console.log('cannot create file!');
            require("fs").writeFile(face_path, base64DataFile2, 'base64', function (err) {
                if (err) console.log('cannot create file!');
                data.append('file[]', fs.createReadStream(id_path));
                data.append('file[]', fs.createReadStream(face_path));
                fs.unlink(id_path, (err) => {
                    if (err) throw err;
                });
                fs.unlink(face_path, (err) => {
                    if (err) throw err;
                });
                fetch('https://api.fpt.ai/dmp/checkface/v1', {
                    method: 'POST',
                    headers: {
                        // 'Authorization': `bearer ${token}`,
                        'api_key': 'DMP@2019'
                    },
                    body: data
                })
                    .then(response => response.json())
                    .then(resData => {
                        console.log(resData);
                        if (resData.data.isMatch === true && resData.data.isBothImgIDCard === false && resData.data.similarity < 100) {
                            Shareholder.findByIdAndUpdate({_id: req.params.id}, {
                                image_face: req.body.file2,
                                //image_face: "",
                                updated_time: Date.now(),
                                is_match: true
                            }, {new: true}, function (err, shareholder) {
                                if (err) throw next(err);
                                res.json({message: "OK"});
                            })
                            ;
                        } else {
                            Shareholder.findByIdAndUpdate({_id: req.params.id}, {
                                image_face: req.body.file2,
                                //image_face: "",
                                updated_time: Date.now(),
                                is_match: false
                            }, {new: true}, function (err, shareholder) {
                                if (err) throw next(err);
                                res.json({message: "Not OK"});
                            })
                            ;
                        }
                    })
                    .catch((error) => {
                        res.json({message: error});
                    });
            })
        });


    }
);

module.exports = router;
