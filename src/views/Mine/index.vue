<template>
  <div>
    <Header title="我的喵喵"></Header>
    <Login></Login>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Login from "@/components/Login"

export default {
  name: "Mine",
  components: {
    Header,
    Login
  }
}
</script>

<style lang="scss" scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .login_body{  width:100%;}
</style>