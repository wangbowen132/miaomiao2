<template>
  <div id="content">
    <div class="login_body">
      <div>
        <input v-model="username" class="login_text" type="text" placeHolder="账户名/手机号/Email" >
      </div>
      <div>
        <input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码" >
      </div>
      <div>
        <input v-model="verifyImg" class="login_text" type="text" placeHolder="请输入您的验证码" >
        <div v-html="imgcode" @click="handleToVerifyImg"></div>
      </div>
      <div class="login_btn">
        <input @click="handleToLogin" type="submit" value="登录">
      </div>
      <div class="login_link">
        <router-link tag="a" to="/mine/register">立即注册</router-link>
        <router-link tag="a" to="/mine/findPassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name: 'Login',
  data(){
    return {
      username: '',
      password: '',
      verifyImg: '',
      imgcode: ''
    }
  },
  methods: {
    handleToLogin(){
      this.axios.post('/api2/users/login', {
        username: this.username,
        password: this.password,
        verifyImg: this.verifyImg
      }).then((res) => {
        var _this = this;
        var status = res.data.status
        if(status === 0){
          messageBox({
            title: '登录',
            content: '登录成功',
            ok: '确定',
            handleOk(){
              _this.$router.push('/mine/center')
            }
          })
        }else{
          var content = null;
          switch(status) {
            case -1:
              content = '验证失败';
              break;
            case -2:
              content = '用户名或密码错误';
              break;
            case -3:
              content = '账号已冻结';
              break;
            default:
              content = '登录失败';

          }
          messageBox({
            title: '登录',
            content,
            ok: '确定',
            handleOk(){
              if(status === -2){
                _this.password = '';
              }else if(status === -1){
                _this.verifyImg = '';
              }
            }
          })
        }
      });
    },
    handleToVerifyImg(){
      this.axios.get('/api2/users/verifyImg?' + Math.random()).then((res) => {
        this.imgcode = res.data;
      })
    }
  },
  mounted(){
    this.handleToVerifyImg();
  }
}
</script>

<style lang="scss" scoped>

.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}

</style>