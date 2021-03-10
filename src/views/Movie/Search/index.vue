<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message">
      </div>					
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="movie in movieList" :key="movie.id">
          <div class="img"><img :src="movie.img.replace('w.h','128.180')"></div>
          <div class="info">
            <p><span>{{movie.nm}}</span><span>{{movie.sc}}</span></p>
            <p>{{movie.enm}}</p>
            <p>{{movie.cat}}</p>
            <p>{{movie.rt}}</p>
          </div>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Search',
  data(){
    return {
      message: '',
      movieList: []
    }
  },
  methods: {
    cancelRequest(){
      if(typeof this.source ==='function'){
        this.source('终止请求')
      }
    }
  },
  watch: {
    // 监听参数变化, 第一个参数为新值, 第二个参数为旧值
    message(newVal){
      // 防止快速输入导致无效请求, 使用延时器或终止axios频繁请求的方法
      if(newVal){
        this.cancelRequest();
        var newId = localStorage.getItem("newId")
        axios.get(`/ajax/ajax/search?kw=${newVal}&cityId=${newId}`, {
          cancelToken: new axios.CancelToken((c) => {
            this.source = c; 
          })
        }).then(res => {
          if(res.data.movies){
            this.movieList = res.data.movies.list
          }else{
            this.movieList = []
          }
        })
      }else{
        this.movieList = []
      }
    }
  }
}
// https://m.maoyan.com/ajax/search?kw=a&cityId=55&stype=-1
</script>

<style lang="scss" scoped>

.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}

</style>