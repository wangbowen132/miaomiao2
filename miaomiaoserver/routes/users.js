var express = require('express');
var router = express.Router();
var usersControllers = require('../controllers/users');

const multer = require('multer');
var upload = multer({ dest: 'public/images' });

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/login', usersControllers.login); 
router.post('/register', usersControllers.register); 
router.get('/verify', usersControllers.verify); 
router.get('/logout', usersControllers.logout); 
router.get('/getUser', usersControllers.getUser); 
router.post('/findPassword', usersControllers.findPassword); 
router.get('/verifyImg', usersControllers.verifyImg); 
router.post('/uploadUserHead', upload.single('file'), usersControllers.uploadUserHead); 

module.exports = router;
