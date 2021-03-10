<template>
  <div id="main">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar"
export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="scss">
a{color: black; text-decoration: none;}
</style>
