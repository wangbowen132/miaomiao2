var { Email, Head } = require('../untils/config');
var Base = require('../untils/base');
var UserModel = require('../models/users');
var fs = require('fs');

var login = async (req, res) => {
  var { password, username, verifyImg } = req.body;
  password = Base.setCrypto(password)
  if(verifyImg !== req.session.verifyImg){
    res.send({
      msg: '验证失败',
      status: -1
    })
  }else{
    var result = await UserModel.findLogin({ password, username });
    if(result){
      if(result.isFreeze){
        res.send({
          msg: '账号已冻结',
          status: -3
        });
      }else{
        req.session.username = username;
        req.session.isAdmin = result.isAdmin;
        req.session.HeadImg = result.HeadImg;
        res.send({
          msg: '登录成功',
          status: 0
        });
      }
    }else{
      res.send({
        msg: '用户名或密码错误',
        status: -2
      })
    }
  }
};
var register = async (req, res) => {
  var { username, password, email, verify } = req.body;
  
  if( email !== req.session.email || verify !== req.session.verify || 
    (Date.now() - req.session.time) > 60*1000){
    res.send({
      msg: '验证失败',
      status: -1
    })
  }else{
    password = Base.setCrypto(password)
    var result = await UserModel.save({ username, password, email, verify });
    if( result ){
      res.send({
        msg: '注册成功',
        status: 0
      });
    }else{
      var isEmail = await UserModel.findLogin({ email });
      if(isEmail){
        res.send({
          msg: '邮箱已注册',
          status: -2
        });
      }else{
        var isUsername = await UserModel.findLogin({ username });
        if(isUsername){
          res.send({
            msg: '用户名已存在',
            status: -3
          });
        }else{
          res.send({
            msg: '注册失败',
            status: -4
          });
        }
      }
    }
  }
};
var verify = async (req, res) => {
  var email = req.query.email; 
  var verify = Email.verify;

  req.session.verify = verify;
  req.session.email = email;
  req.session.time = Date.now();
  

  var mailOptions = {
    from: '喵喵网 new1323w@outlook.com',
    to: email,
    subject: '喵喵网验证码',
    text: '验证码: ' + verify
  }

  Email.transporter.sendMail(mailOptions, (err) => {
    if(err){
        res.send({
          msg: '验证码发送失败',
          status: -1
        })
    }else {
      res.send({
        msg: '验证码发送成功',
        status: 0
      })
    }
  });
};
var logout = async (req, res,) => {
  req.session.username = '';
  res.send({
    msg: '退出成功',
    status: 0
  })
};
var getUser = async (req, res) => {
  if(req.session.username){
    res.send({
      msg: '获取用户信息成功',
      username: req.session.username,
      isAdmin: req.session.isAdmin,
      HeadImg: req.session.HeadImg,
      status: 0
    });
  }else{
    res.send({
      msg: '获取用户信息失败',
      status: -1
    });
  }
};
var findPassword = async (req, res) => {
  var { email, password, verify } = req.body;
  console.log(Date.now())
  console.log((Date.now() - req.session.time)/1000)
  if( email !== req.session.email || verify !== req.session.verify  || 
    (Date.now() - req.session.time) > 60*1000){
    res.send({
      msg: '验证失败',
      status: -1
    });
  }else{
    password = Base.setCrypto(password)
    var result = await UserModel.updatePassword({ email, password });
    if(result){
      res.send({
        msg: '修改成功',
        status: 0
      })
    }else{
      res.send({
        msg: '修改失败',
        status: -2
      })
    }
  }
};
var verifyImg = async(req, res) => {
  var result = await Base.verifyImg();
  console.log(result.text.toLowerCase());
  if(result){
    req.session.verifyImg = result.text.toLowerCase();
    res.send(result.data);
  }
}
var uploadUserHead = async(req, res) => {
  if(req.file){
    var oldFilepath = "public/images/" + req.file.filename;
    var newFilepath = "public/images/" + req.session.username + '.jpg';
    fs.rename(oldFilepath, newFilepath, (err) => {
      console.log(err)
    });
    
    var HeadImg = Head.imgUrl + req.session.username + '.jpg';
    var result = await UserModel.updateHead({ username: req.session.username, HeadImg });
    if(result){
      req.session.HeadImg = HeadImg;
      res.send({
        msg: '修改成功',
        HeadImg: req.session.HeadImg,
        status: 0
      });
    }else{
      res.send({
        msg: '修改失败',
        status: -1
      });
    }
  }
}

module.exports = {
  login,
  register,
  verify,
  logout,
  getUser,
  findPassword,
  verifyImg,
  uploadUserHead
}