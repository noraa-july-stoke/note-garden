const express = require('express');
const router = express.Router();
const apiRouter = require('./api');



router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        console.log('CSRF Token:', req.csrfToken());
        console.log('XSRF-TOKEN Cookie:', req.cookies['XSRF-TOKEN']);
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.status(201).json({});
    });
}

// error handling middleware
// router.use((err, req, res, next) => {
//     // check if the error is a validation error
//     if (err.errors) {
//         return res.status(err.status).json({ errors: err.errors, title: err.title });
//     }

//     // handle other types of errors here
//     console.error(err);

//     // send a generic error response
//     res.status(500).json({ errors: { server: 'An unexpected error occurred.' }, title: 'Server Error' });
// });


module.exports = router;
