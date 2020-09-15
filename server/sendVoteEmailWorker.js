const Queue = require('bull');
const mongoose = require('mongoose');
const { voteEmailQueue, sendVoteEmail } = require('./controllers/shareholderController')
const db = require('./config/dev').mongoURI;

mongoose.Promise = global.Promise;
mongoose.connect(db).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

voteEmailQueue.process(5, async (job, done) => {
  console.log('in job')
  console.log(job.data)
  sendVoteEmail(job.data, (err, message) => {
    if (err) {
      done(new Error(err.toString()));
      // log error
    } else if (message && message.accepted && message.accepted.length == 0) {
      // log error
      done(new Error('SMTP email not accepted'));
      console.log(message)
    } else {
      // success
      console.log('Done')
      done(null, job.data)
    }
  })
})

