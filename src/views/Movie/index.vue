<template>
  <div id="content">
    <Header title="喵喵电影"></Header>
    <div class="movie_menu">
      <router-link tag="div" to="/movie/city" class="city_name active">
        <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <div class="hot_swtich">
        <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
        <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
      </div>
      <router-link tag="div" to="/movie/search" class="search_entry">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>

    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/Header"
import {messageBox} from "@/components/JS"
import jsonp from 'jsonp'

export default {
  name: "Movie",
  components: {
    Header
  },
  mounted() {
    // jsonp参数: url  url传参  回调名称
    // axios反向代理 跨域访问 ip 定位网址, 获取的ip是 代理服务器 的ip
    jsonp('https://api.map.baidu.com/location/ip?ak=fkoXgLpWg7o07lbkWfEg4vrtx3VGH5lq', null, (err, data) => {
      if (err) {
        console.error(err.message);

      } else {
        var newCity = {};
        var cityInfo = data.content.address_detail;
        newCity.nm = cityInfo.city.slice(0, -1);


        var cities  = JSON.parse(localStorage.getItem("cities"))
        var city = cities.filter(item => item.nm === newCity.nm);
        newCity.id = city[0].id;

        var prevNm = localStorage.getItem("newNm");
        if(prevNm === newCity.nm){
          return;
        }
        var that = this;
        setTimeout(()=>{
          messageBox({
            title: '定位',
            content: newCity.nm,
            cancel: '取消',
            ok: '切换定位',
            handleOk(){
              that.$store.commit("CITY_INFO", {
                newNm: newCity.nm,
                newId: newCity.id
              });
              location.reload();
            }
          });
        }, 2000)
      }
    });
  },
}
</script>

<style lang="scss" scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10; /* flex: 1; */}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
.movie_menu .router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}

#content .movie_body{ flex:1; overflow:hidden;}
#content .search_body{ flex:1; overflow:auto;}
#content .city_body{ /* margin-top: 45px; */ display: flex; width:100%; height: 100%; overflow: hidden; /* position: absolute; top: 0; bottom: 0; */}

</style>