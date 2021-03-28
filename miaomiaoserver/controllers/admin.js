var UserModel = require('../models/users');

var index = async (req, res) => {
  res.send({
    msg: '管理员权限',
    status: 0
  })
}

var usersList = async (req, res) => {
  var result = await UserModel.usersList();
  if(result){
    res.send({
      msg: '用户信息已发送',
      data: {
        usersList: result
      },
      status: 0
    });
  }else{
    res.send({
      msg: '请求数据失败',
      status: -1
    });
  }
}

var freezeUser = async(req, res) => {
  var { email, isFreeze } = req.body;
  var result = await UserModel.freezeUser({ email, isFreeze });
  if(result){
    res.send({
      msg: '账号冻结操作成功',
      status: 0
    })
  }else{
    res.send({
      msg: '账号冻结操作失败',
      status: -1
    })
  }
}

var deleteUser = async(req, res) => {
  var { email } = req.body;
  var result = await UserModel.deleteUser({ email });
  if(result){
    res.send({
      msg: '账号已删除',
      status: 0
    })
  }else{
    res.send({
      msg: '账号删除失败',
      status: -1
    })
  }
}

module.exports = {
  index,
  usersList,
  freezeUser,
  deleteUser
}