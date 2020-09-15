const Shareholder = require('../models/Shareholder');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/smtp');
const configKey = require('../config/keys');
const fs = require('fs');
const handlebars = require('handlebars');
const { spawnSync } = require('child_process');
const Queue = require('bull');
const { setQueues  } = require('bull-board');

const voteEmailQueue = new Queue('send vote document', 'redis://127.0.0.1:6379/5');
setQueues([voteEmailQueue])

voteEmailQueue.on('completed', (job, result) => {
  console.log('completed')
  Shareholder.findOneAndUpdate({ _id: result._id }, { $set: { sentVoteEmail: true } }, { fields: { _id: 1 } }, (err, data) => {});
})

const addVoteEmailJob = (email, id_sh, _id, id, language) => {
  voteEmailQueue.add({ email, id_sh, _id, id, language })
}

const smtpConfig = {
  host: emailConfig.smtp.host,
  port: emailConfig.smtp.port,
  secure: emailConfig.smtp.secure,
  auth:{
    user: emailConfig.smtp.username,
    pass: emailConfig.smtp.password
  },
};

const smtpTransporter = nodemailer.createTransport(smtpConfig);
const html_vi = fs.readFileSync('./templates/confirm_email_vi.html', { encoding: 'utf-8' });
const html_en = fs.readFileSync('./templates/confirm_email_en.html', { encoding: 'utf-8' });
const emailVerificationTemplateVi = handlebars.compile(html_vi);
const emailVerificationTemplateEn = handlebars.compile(html_en);

const vote_html_vi = fs.readFileSync('./templates/vote_guide_email_vi.html', { encoding: 'utf-8' });
const vote_html_en = fs.readFileSync('./templates/vote_guide_email_en.html', { encoding: 'utf-8' });
const emailVoteTemplateVi = handlebars.compile(vote_html_vi);
const emailVoteTemplateEn = handlebars.compile(vote_html_en);

const genHTML = (shareholder_name, shareholder_id, verification_url, language) => {
  if (language == 'en') {
    return emailVerificationTemplateEn({ shareholder_name, shareholder_id, verification_url })
  } else {
    return emailVerificationTemplateVi({ shareholder_name, shareholder_id, verification_url })
  }
}

const genVoteHTML = (shareholder_name, shareholder_id, language) => {
  if (language == 'en') {
    return emailVoteTemplateEn({ shareholder_name, shareholder_id })
  } else {
    return emailVoteTemplateVi({ shareholder_name, shareholder_id })
  }
}

const createShareholder = (data, callback) => {
  Shareholder.create(data, (err, shareholder) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, shareholder)
    }
  });
}

const sendVerificationEmail = (shareholder, callback) => {
  const baseUrl = configKey.baseUrl;
  const { email, verification_nonce, name, language } = shareholder;
  const shareholder_id = shareholder.id_sh;
  var verification_url = `${baseUrl}/verify?email=${email}&nonce=${verification_nonce}`;
  if (language == 'en') {
    verification_url += '&lang=en';
  }
  const renderedHTML = genHTML(name, shareholder_id, verification_url, language);
  var subject;
  if (language == 'en') {
    subject = 'Confirmation of Shareholder\'s email address';
    verification_url += '&lang=en';
  } else {
    subject = 'Xác nhận địa chỉ thư điện tử của Cổ đông';
  }
  const mailOptions = {
      from: emailConfig.smtp.fromAddress,
      to: email,
      subject: subject,
      html: renderedHTML,
  };

  // console.log(renderedHTML)
  // return
  smtpTransporter.sendMail(
    mailOptions, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      callback(err, result)
    }
  )
}

const sendVoteEmail = (shareholder, callback) => {
  const { email, language, _id, id } = shareholder;
  const shareholder_id = shareholder.id_sh;
  const { stdout } = spawnSync(process.env.PYTHON_PATH, ['gen.py', shareholder_id, _id.toString(), id, language])
  const outputRaw = stdout.toString()
  console.log(outputRaw)
  const output = JSON.parse(outputRaw)
  const { pdf, name, error } = output
  if (!pdf || !name) {
    console.log(error)
    // log error here
    return callback(error, null)
  }

  const renderedHTML = genVoteHTML(name, shareholder_id, language);
  var subject;
  if (language == 'en') {
    subject = 'Instructions of remote voting for Annual General Meeting of Shareholders'
  } else {
    subject = 'Hướng dẫn bỏ phiếu từ xa'
  }
  const mailOptions = {
      from: emailConfig.smtp.fromAddress,
      to: email,
      subject: subject,
      attachments: [{
        filename: language == 'en' ? `Ballot_${shareholder_id}.pdf` : `Phieu_bieu_quyet_${shareholder_id}.pdf`,
        path: pdf,
        contentType: 'application/pdf'
      }],
      html: renderedHTML,
  };

  // console.log(renderedHTML)
  // return
  smtpTransporter.sendMail(
    mailOptions, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        fs.unlinkSync(pdf);
      }
      callback(err, result)
    }
  )
}


module.exports = {
  createShareholder,
  sendVerificationEmail,
  voteEmailQueue,
  addVoteEmailJob,
  sendVoteEmail,
}

