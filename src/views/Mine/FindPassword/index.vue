<template>
  <div>
    <div id="content">
      <div class="findpassword_body">
        <div class="findpassword_email">
          <input type="text" v-model="email" class="findpassword_text" placeHolder="邮箱"><button :disabled="disabled" @touchend="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
          <input type="password" v-model="password" class="findpassword_text" placeHolder="新密码">
        </div>
        <div>
          <input type="text" v-model="verify" class="findpassword_text" placeHolder="验证码">
        </div>
        <div class="findpassword_btn">
          <button @touchend="handleToFindpassword">修改</button>
        </div>
        <div class="findpassword_link">
          <router-link tag="a" to="/mine/login">立即登录</router-link>
          <router-link tag="a" to="/mine/register">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { verify, messageBox } from '@/components/JS'
export default {
  name: 'FindPassword',
  data(){
    return {
      email: '',
      password: '',
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
    handleToFindpassword(){
      this.axios.post('/api2/users/findPassword', {
        email: this.email,
        password: this.password,
        verify: this.verify
      }).then((res) => {
        if(res.data.status === 0){
          messageBox({
            title: '修改',
            content: '修改密码成功',
            ok: '确定'
          })
        }else{
          messageBox({
            title: '修改',
            content: '修改密码失败',
            ok: '确定'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.findpassword_body .findpassword_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.findpassword_body .findpassword_btn{ height:50px; margin:10px;}
.findpassword_body .findpassword_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.findpassword_body .findpassword_email{position: relative;}
.findpassword_body .findpassword_email button{ position: absolute; right: 5px; top: 20%; width:22%; height:50%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 14px;}
.findpassword_body .findpassword_link{ display: flex; justify-content:space-between;}
.findpassword_body .findpassword_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}

</style>