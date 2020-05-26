var express = require('express');
var router = express.Router();
var path = require("path");


var zip = require('express-easy-zip');
const AdmZip = require('adm-zip');
const re = require("zip-lib");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Challenge' });
});

router.get('/zip', function(req, res, next) {
  re.archiveFile("./public/images/projectone.png", "./public/images/target.zip").then(function () {
    const file = `./public/images/target.zip`;
    res.download(file); // Set disposition and send it.
    console.log("done");
}, function (err) {
    console.log(err);
});
});


// router.get('/zip', function(req, res, next) {

//   var dirPath = __dirname + "../images/projectone.png";

//   console.log("path to asset " + path.join(__dirname, 'public'))

//   res.zip({

//        files: [

//            {   
//                 content: 'This is the project resource folder',      
               
//                 name: 'logo',
               
//                 mode: 0755,

//                 comment: 'comment-for-the-file - test file',

//                 date: new Date(),

//                 type: 'file' },

//                 { path: path.join(__dirname, '../images/projectone.png'), name: 'projectone.png' }    //or a folder

           
//           //  { path: dirPath, name: '../images' }   
 
//        ],
       
//          filename: 'app-project-files.zip'
   
//     });

// });

module.exports = router;
