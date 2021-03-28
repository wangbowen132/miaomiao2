<template>
  <div>
    <div>
      个人中心 <a href="javascript:;" @touchend="handleToLogout">退出</a>
    </div>
    <p>当前用户: {{$store.state.user.name}}</p>
    <p v-if="$store.state.user.isAdmin">用户身高: 管理员 <a href="/admin" target="_Blank">进入管理界面</a></p>
    <p v-else>用户身高: 普通会员</p>
    <div>
      <input type="file" class="file" @change="uploadConfig">
    </div>
    <img class="userHead" :src="$store.state.user.HeadImg" alt="">
  </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS'
export default {
  name: 'Center',
  methods: {
    handleToLogout(){
      this.axios.get('/api2/users/logout').then((res) => {
        if(res.data.status === 0){
          this.$router.push('/mine/login');
          this.$store.commit('USER_NAME', { name: '', isAdmin: false, HeadImg: ''});
        }
      })
    },
    uploadConfig(e){
      var formData = new FormData();
      var file = e.target.files[0];
      
      getFileMimeType(file).then((res) => {
        if(res !== 'jpg' && res !== 'png' && res !== 'gif' && res !== 'webp'){
          messageBox({
            title: '上传',
            content: '文件类型错误',
            ok: '确定',
          });
        }else{
          formData.append('file', file, file.name);
          this.axios.post('/api2/users/uploadUserHead', formData).then((res) => {
            if(res.data.status === 0){
              
              var content = '上传成功' ;

              this.$store.commit('USER_NAME', {
                    name: this.$store.state.user.name,
                    isAdmin: this.$store.state.user.isAdmin,
                    HeadImg: res.data.HeadImg + '?' + Math.random()
                  });
            }else{
              content = '上传失败' ;    
            }
              messageBox({
                title: '上传',
                content,
                ok: '确定',
                handleOk(){
                   
                }
              })
          });

        }
      })
      
    }
  },
  

  beforeRouteEnter (to, from, next) {
    axios.get('/api2/users/getUser').then((res) => {
      if(res.data.status === 0){
        next(vm => {
          vm.$store.commit('USER_NAME', {
            name: res.data.username,
            isAdmin: res.data.isAdmin,
            HeadImg: res.data.HeadImg
          });
        });
      }else{
        next('/mine/login');
      }
    })
  }
}

function getFileMimeType(file) {
  const map = {
    'FFD8FFE0': 'jpg',
    '89504E47': 'png',
    '47494638': 'gif',
    "52494646": 'webp'
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
        let array = new Uint8Array(event.target.result);
        array = array.slice(0, 4);
        let arr = [...array]
        let key = arr.map(item => item.toString(16)
            .toUpperCase()
            .padStart(2, '0'))
            .join('')
        resolve(map[key])

      } catch (e) {
        reject(e);
      }
    };
  });
}
</script>

<style lang="scss" scoped>
.userHead{
  height: 100px; width: 100px; border-radius: 50%; overflow: hidden;
}
</style>