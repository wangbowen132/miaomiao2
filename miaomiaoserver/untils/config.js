var mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var Mongoose = {
  url: 'mongodb://localhost:27017/miaomiao',
  connect(){
    mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if(err){
        console.log('数据库连接失败')
        return;
      }
      console.log('数据库连接成功')
    })
  }
}
var Email = {
  config: {
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: 'new1323w@outlook.com', // generated ethereal user
      pass: 'a1323wang', // generated ethereal password
    }
  },
  get transporter(){
    return nodemailer.createTransport(this.config)
  },
  get verify(){
    return (parseInt(Math.random()*9999)).toString();
  }
}

var Head = {
  imgUrl: 'http://localhost:3000/images/'
}

module.exports = {
  Mongoose,
  Email,
  Head
}