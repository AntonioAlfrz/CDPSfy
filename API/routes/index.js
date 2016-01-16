var express = require('express');
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
var PATH = 'public/media/';

var storage = multer.diskStorage({
  destination: function (req, data, func) {
    func(null, PATH)
  },
  filename: function (req, data, func) {
    func(null, data.originalname);
  }
});

var cancion = multer({storage: storage}).single("Song");
var foto = multer({storage: storage}).single("Caratula");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* POST */
router.post('/upload/:songId', function(req, res) {
 cancion(req,res, function(err){
    if (err) {console.log(err);res.status(404).end()}
    res.status(204).end()
   });
});
/* POST */
router.post('/foto/:songId', function(req, res) {
 foto(req,res, function(err){
     if (err) {console.log(err);res.status(404).end()}
     res.status(204).end()
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
