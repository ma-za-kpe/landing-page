var express = require('express');
var router = express.Router();
var path = require("path");


var zip = require('express-easy-zip');
const AdmZip = require('adm-zip');
const re = require("zip-lib");
const advancedResults = require('../middleware/advancedResults');

// controllers
const IndexController = require('../controllers/index');

//models
const Post = require('../models/Index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Challenge' });
});

//download resources
router.get('/zip', function(req, res, next) {
  re.archiveFile("./public/images/logo.png", "./public/images/target.zip").then(function () {
    const file = `./public/images/target.zip`;
    res.download(file); // Set disposition and send it.
    console.log("done");
}, function (err) {
    console.log(err);
});
});

//post link
router.use('/postLink',IndexController.postLink);

router.get('/getAllLists',advancedResults(Post, 'posts'),IndexController.getAllLinks);

module.exports = router;
