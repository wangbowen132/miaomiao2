const crypto = require('crypto');
var svgCaptcha = require('svg-captcha');

const setCrypto = (info) => {
  return crypto.createHmac('sha256', '@#$@').update(info).digest('hex');
} 

const verifyImg = () => {
  var codeConfig = {
    size: 4,// 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 6, // 干扰线条的数量
    height: 60,
    inverse: false,
    fontSize: 60,
  }
  var captcha = svgCaptcha.create(codeConfig);
  return captcha;
}


module.exports = {
  setCrypto,
  verifyImg
}