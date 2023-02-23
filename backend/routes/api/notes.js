const { Storage } = require('@google-cloud/storage');
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');

const router = express.Router();
const uploadImage = require('../../utils/upload-helpers')

router.post('/image', async (req, res, next) => {
    let imageUrl
    try {
        const newFile = req.file
        console.log(newFile)
        imageUrl = await uploadImage(newFile)
        res
            .status(200)
            .json({
                message: "Upload was successful",
                data: imageUrl
            })
    } catch (error) {
        next(error)
    }

    console.log(imageUrl)
})

router.post('/text', async (req, res, next) => {

})
module.exports = router;
