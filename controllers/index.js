const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Link = require("../models/Index");

module.exports = {
    // @desc      Register user
    // @route     POST /postlink
    // @access    Public
    postLink: asyncHandler(async (req, res, next) => {
        const {
            username,
            email,
            url,
            project
        } = req.body;

        // Create link
        const link = await Link.create({
            username,
            email,
            url,
            project
        });

        sendTokenResponse(link, 200, res);

    }),
     // @desc  get all lists
    // @route  GET /getAllLists
    // @access  Public
    getAllLinks: asyncHandler(async (req, res) => {

        res.status(200).json(res.advancedResults);

    })
    
};

// Get token from model, create cookie and send response
const sendTokenResponse = (link, statusCode, res) => {
    
    res.status(statusCode)
        .json({
            success: true,
            data: link
        });
        
};