<template>
  <div id="main">
    <Header title="我的喵喵" />
    <router-view />
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Tabbar from "@/components/Tabbar"

export default {
  name: "Mine",
  components: {
    Header,
    Tabbar
  }
}
</script>

<style lang="scss" scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .login_body{  width:100%;}
</style>