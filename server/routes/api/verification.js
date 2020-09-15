const express = require('express');
const router = express.Router();
var Shareholder = require('../../models/Shareholder');
const path = require('path');
const { addVoteEmailJob } = require('../../controllers/shareholderController');

router.get('/', function (req, res, next) {
  const email = req.query.email
  const nonce = req.query.nonce
  const lang = req.query.lang == 'en' ? '_en' : ''
  Shareholder.findOne({ email, verification_nonce: nonce }, { _id: 1, activated: 1, email: 1, id_sh: 1, language: 1, type_online: 1, sentVoteEmail: 1, id: 1 }, (err, shareholder) => {
    if (err) {
      console.log(err)
      res.sendFile(path.join(__dirname + '../../../templates/verification_error' + lang + '.html'));
    } else if (shareholder) {
      if (shareholder.activated !== true) {
        shareholder.updateOne({ activated: true }, (_, updateResult) => {
          if (updateResult && updateResult.ok) {
            const { type_online, email, id_sh, _id, language, sentVoteEmail, id } = shareholder;
            if ((type_online == 1 || type_online == 2) && sentVoteEmail != true) {
              addVoteEmailJob(email, id_sh, _id, id, language);
            }
            res.sendFile(path.join(__dirname + '../../../templates/verification_success' + lang + '.html'));
          } else {
            res.sendFile(path.join(__dirname + '../../../templates/verification_error' + lang + '.html'));
          }
        })
      } else {
        res.sendFile(path.join(__dirname + '../../../templates/verification_already_success' + lang + '.html'));
      }
    } else {
      res.sendFile(path.join(__dirname + '../../../templates/verification_error' + lang + '.html'));
    }
  })
});

module.exports = router;
