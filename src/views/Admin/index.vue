<template>
  <el-container>
    <el-header>喵喵网管理后台, 欢迎 {{$store.state.user.name}}</el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-menu>
            <router-link to="/admin/users" v-slot="{ navigate, isActive }">
              <el-menu-item index="1" @click="navigate" :active="isActive" :class="isActive?'is-active':''">
                <i class="el-icon-menu"></i>
                <span slot="title">用户</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/movie" v-slot="{ navigate, isActive }">
              <el-menu-item index="2" @click="navigate" :active="isActive" :class="isActive?'is-active':''">
                <i class="el-icon-document"></i>
                <span slot="title">电影</span>
              </el-menu-item>
            </router-link>
            <router-link to="/admin/cinema" v-slot="{ navigate, isActive }">
              <el-menu-item index="3" @click="navigate" :active="isActive" :class="isActive?'is-active':''">
                <i class="el-icon-setting"></i>
                <span slot="title">影院</span>
            </el-menu-item>
            </router-link>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Admin',
  beforeRouteEnter (to, from, next) {
    axios.get('/api2/admin').then((res) => {
      if(res.data.status === 0){
        next();
      }else{
        next('/mine/login');
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    padding-left: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>