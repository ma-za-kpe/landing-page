const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Link = require("../models/Index");

module.exports = {
    // @desc      Register user
    // @route     POST /postlink
    // @access    Public
    postLink: asyncHandler(async (req, res, next) => {
        const {
            url
        } = req.body;

        // Create link
        const link = await Link.create({
            url
        });

        sendTokenResponse(link, 200, res);
    })
    
};

// Get token from model, create cookie and send response
const sendTokenResponse = (link, statusCode, res) => {
    res
        .status(statusCode)
        .json({
            success: true,
            data: link
        });
};