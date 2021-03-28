<template>
  <div id="content">
    <div class="register_body">
      <div class="register_email">
        <input type="text" v-model="email" class="register_text" placeHolder="邮箱"><button :disabled="disabled" @touchend="handleToVerify">{{verifyInfo}}</button>
      </div>
      <div>
        <input type="text" v-model="username" class="register_text" placeHolder="用户名">
      </div>
      <div>
        <input type="password" v-model="password" class="register_text" placeHolder="密码">
      </div>
      <div>
        <input type="password" v-model="repassword" class="register_text" placeHolder="确认密码">
      </div>
      <div>
        <input type="text" v-model="verify" class="register_text" placeHolder="验证码">
      </div>
      <div class="register_btn">
        <button @touchend="handleToRegister">注册</button>
      </div>
      <div class="register_link">
        <router-link tag="a" to="/mine/login">立即登录</router-link>
        <router-link tag="a" to="/mine/findPassword">找回密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { messageBox, verify } from '@/components/JS'
export default {
  name: 'Register',
  data(){
    return {
      email: '',
      username: '',
      password: '',
      repassword: '',
      verify: '',
      verifyInfo: '发送验证码',
      disabled: false
    }
  },
  methods: {
    handleToVerify(){
      if(this.disabled === true){
        return;
      }
      verify(this.email, () => {
        this.disabled = true;
        var count = 60;
        this.verifyInfo = count + '秒';
        var timer = setInterval(() => {
          count--;
          this.verifyInfo = count + '秒';
          if(count === 0){
            this.disabled = false;
            this.verifyInfo = '发送验证码'
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    handleToRegister(){
      if(this.password === this.repassword){
        this.axios.post('/api2/users/register', { 
          email: this.email, 
          username: this.username, 
          password: this.password,
          verify: this.verify
        }).then((res) => {
          var status = res.data.status;
          var _this = this;
          if(status === 0){
            messageBox({
              title: '注册',
              content: '注册成功',
              ok: '确定',
              handleOk(){
                _this.$router.push('/mine/login');
              }
            });
          }else{
            var content = null;
            switch(status) {
              case -1:
                content = "验证失败";
                break;
              case -2:
                content = "邮箱已注册";
                break;
              case -3:
                content = "用户名已存在";
                break;
              default:
                content = "注册失败";
            }
            messageBox({
              title: '注册',
              content,
              ok: '确定'
            });
          }
        });
      }else{
        messageBox({
          title: '注册',
          content: '密码不一致',
          ok: '确定'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_btn{ height:50px; margin:10px;}
.register_body .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_email{position: relative;}
.register_body .register_email button{ position: absolute; right: 5px; top: 20%; width:22%; height:50%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 14px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}

</style>