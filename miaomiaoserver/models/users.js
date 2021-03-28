var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var { Head } = require('../untils/config')

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now() },
  isAdmin: { type: Boolean, default: false },
  isFreeze: { type: Boolean, default: false },
  HeadImg: { type: String, default: Head.imgUrl + 'default.jpg'}
});



var UserModel = mongoose.model('User', UserSchema);

UserModel.createIndexes();

var save = (data) => {
  var user = new UserModel(data);
  return user.save().then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}

var findLogin = (data) => {
  return UserModel.findOne(data);
}

var updatePassword = ({email, password}) => {
  return UserModel.updateOne({ email }, { $set: { password } }).then(() => {
    return true;
  }).catch(() => {
    return false;
  })
}

var updateHead = ({username, HeadImg}) => {
  return UserModel.updateOne({ username }, { $set: { HeadImg } }).then(() => {
    return true;
  }).catch(() => {
    return false;
  })
}

var usersList = () => {
  return UserModel.find();
}

var freezeUser = ({email, isFreeze}) => {
  return UserModel.updateOne({ email }, { $set: { isFreeze } }).then(() => {
    return true;
  }).catch(() => {
    return false;
  })
}

var deleteUser = ({ email }) => {
  return UserModel.deleteOne({ email }).then(() => {
    return true;
  }).catch(() => {
    return false;
  })
}

module.exports = {
  save,
  findLogin,
  updatePassword,
  usersList,
  freezeUser,
  deleteUser,
  updateHead
}
