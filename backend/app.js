const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const bodyParser = require('body-parser')
const multer = require('multer')

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// multer middleware it will populate req.files with the files
// payload and req.body with the text fields
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files are allowed!"));
    }
    callback(null, true);
  },
});

// morgan middleware for logging
app.use(morgan('dev'));
// cookie parser middleware for parsing cookies
// it will populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
// express middleware for parsing json it will populate req.body with the json payload
app.use(express.json());
// express middleware for parsing urlencoded data it will
//  populate req.body with the urlencoded payload
app.use(multerMid.fields([{ name: "files", maxCount: 10 }]));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);


// routes middleware it works by matching the request url with the routes
app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});


module.exports=app;
