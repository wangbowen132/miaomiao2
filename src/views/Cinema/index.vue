<template>
  <div id="main">
    <div id="content">
      <Header title="喵喵影院"></Header>
      <div class="cinema_menu">
        <div class="city_switch">
          全城 <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌 <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色 <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <CityList></CityList>
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import CityList from '@/components/CityList'
import Tabbar from "@/components/Tabbar"


export default {
  name: "Cinema",
  components: {
    Header,
    CityList,
    Tabbar
  }
}
</script>

<style lang="scss" scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
#content .cinema_body{ flex:1; overflow:hidden;}
</style>