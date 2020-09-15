// *** main dependencies ***//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const boom = require('boom'); //HTTP-friendly error object
const errorManagement = require('./aspect/errorManagement');
const logger = require('./aspect/logger');
const morgan = require('morgan');
const cors = require('cors');
const { UI } = require('bull-board');


const getOperation = require('./expressMiddleware/setOperationMiddleware');
const checkToken = require('./expressMiddleware/checkIdTokenMiddleware');


var fileUpload = require('express-fileupload');


//route

const profileManagement = require('./routes/api/profileManagement');
const historyManagement = require('./routes/api/historyManagement');
const photosRoute = require('./routes/api/photos');
const shareholderRoute = require('./routes/api/shareholders');
const verificationRoute = require('./routes/api/verification');
const ocrRoute = require('./routes/api/ocr');
const facematchRoute = require('./routes/api/facematch');
const confirmOnlineRoute = require('./routes/api/confirmOnline')
const formRoute = require('./routes/api/form')
const faceIDRoute = require('./routes/api/faceID')
const createShopRoute = require('./routes/api/createShop')
const editShopRoute = require('./routes/api/editShop')
const currentPageRoute = require('./routes/api/currentPage')

const user_model = require('./models/User.js');
//*** routes ***//
// Express router include two steps: load the route, and use the route.
// load routes
//*** express instance ***//
const app = express();
// put logger high up the stack- so all requests pass through it.
// Putting morgan logger middleware before other middleware.
app.use(fileUpload());
app.use(morgan('combined'));
app.use(cors());

const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});


// *** mongoose ***//
const db = require('./config/dev').mongoURI;
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
mongoose.connect(db).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



// user_model.count(function (err, count) {
// if (err) {
// console.log(err)
// } else {
// if (count === 0) {
// user_model.create(require('./config/schema').user, function (err, post) {
// saveToCache(cus_name_collection, post._id.toString(), post.local.username.toString());
// });
// }
// }
// next();
// });


//*** config middleware ***//
// put logger high up the stack- so all requests pass through it.
const loggerMiddleware = (req, res, next) => {
    logger.info(`New request ${req.url}`);
    next();
};
app.use(loggerMiddleware);

//app.use(helmet());
// parse application/x-www-form-urlencoded for easier testing with Postman or plain HTML forms
//app.use(bodyParser.urlencoded({extended: true}));
// Body parser middleware

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(cookieParser());

//*** main routes **//
//Use routes - Express middleware in order so this use routes path should before app.listen()


// app.use('/api/profileManagement',checkToken,profileManagement);
// app.use('/api/historyManagement',checkToken,historyManagement);
// app.use('/photos', checkToken, photosRoute);
app.use('/api/shareholders', shareholderRoute);
app.use('/verify', verificationRoute);
app.use('/api/ocr', ocrRoute);
app.use('/api/facematch', facematchRoute);
app.use('/api/confirmOnline', confirmOnlineRoute)
app.use('/api/form', formRoute)
app.use('/api/faceID', faceIDRoute)
app.use('/api/createShop', createShopRoute)
app.use('/api/editShop',editShopRoute)
app.use('/api/currentPage', currentPageRoute)

app.use('/admin/queues', UI);
errorManagement.handling.registerAndHandleAllErrors(app);
module.exports = app;
