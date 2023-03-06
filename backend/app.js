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

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: function (req, file, callback) {
        if (!file.mimetype.startsWith('image/')) {
            return callback(new Error('Only image files are allowed!'));
        }
        callback(null, true);
    }
})

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(multerMid.single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
