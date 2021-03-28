var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin')

router.use((req, res, next) => {
  if(req.session.username && req.session.isAdmin){
    next();
  }else{
    res.send({
      msg: '没有管理员权限',
      status: -1
    })
  }
})

/* GET admin listing. */
router.get('/', adminControllers.index);
router.get('/usersList', adminControllers.usersList);
router.post('/freezeUser', adminControllers.freezeUser);
router.post('/deleteUser', adminControllers.deleteUser);

module.exports = router;