var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Challenge' });
});

router.get('/zip', function(req, res, next) {

  var dirPath = __dirname + "../public/images/";

  res.zip({

       files: [

           {   
                content: 'This is the project resource folder',      
               
                name: 'logo.png',
               
                mode: 0755,

                comment: 'comment-for-the-file - test file',

                date: new Date(),

                type: 'file' },
           
           { path: dirPath, name: 'images' }   
 
       ],
       
         filename: 'app-project-files.zip'
   
    });

});

module.exports = router;
