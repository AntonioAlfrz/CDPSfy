var express = require('express');
var router = express.Router();
var  multer = require("multer");
var  fs = require("fs");
var PATH = 'public/media/'
var upload = multer({dest: PATH}).single("Song");
var foto = multer({dest: PATH}).single("Caratula");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/upload/:songId', function(req, res) {
	//console.log(req)
 upload(req,res, function(err){
 	// console.log(req)
     if (err) console.log(err);
     fs.rename(PATH+req.file.filename, PATH+req.file.originalname, function(err) {
        if ( err ) console.log('ERROR: ' + err);
        console.log('done')
        res.status(204).end()
      });
   });
});
router.post('/foto/:songId', function(req, res) {
	//console.log(req)
 foto(req,res, function(err){
 	// console.log(req)
     if (err) console.log(err);
     
   fs.rename(PATH+req.file.filename, PATH+req.file.originalname, function(err) {
      if ( err ) console.log('ERROR: ' + err);
      console.log('done')
      res.status(204).end()
    });
  });
});


router.delete('/delete', function(req,res){
	console.log(req.body)
	try{fs.unlink(PATH+req.body.ident +'.'+req.body.song,function (err) {
		   if (err) return console.log(err);

	
		if(req.body.img != ''){
		 try{fs.unlink(PATH+req.body.ident +'.'+req.body.img,function (err) {
			if (err) return console.log(err);
			res.status(204).end()
		} )} catch(e){res.status(404).end()}
		} else{res.status(204).end()}
	 } )} catch(e){res.status(404).end()}
})

module.exports = router;
