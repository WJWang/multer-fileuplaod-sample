var express = require('express');
var router = express.Router();
var multer  = require('multer')
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/uploads/') )
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})

var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/file', upload.single('photo'), function (req, res) {
  const url = req.file.path.split('public/')[1];
  res.render('photo', {
    title: req.body.title,
    img: url
  })
})
module.exports = router;
