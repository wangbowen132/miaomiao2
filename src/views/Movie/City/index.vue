<template>
  <div class="city_body">
    
    <div class="city_list">
      <Loading v-if="isLoading"></Loading>
      <ScrollList v-else ref="scroll_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="city in hotList" :key="city.id" @click="handleCity(city.nm,city.id)">{{city.nm}}</li>
            </ul>
          </div>
          <div class="city_sort">
            <div v-for="data in cityList" :key="data.index">
              <!-- <a :id="data.index"></a> -->
              <h2>{{data.index}}</h2>
              <ul>
                <li v-for="city in data.list" :key="city.id" @click="handleCity(city.nm,city.id)">{{city.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollList>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(letter,index) in letterList" :key="letter" @click="scrollToIndex(index)">
          <!-- <a :href="'#'+letter"> -->{{letter}}<!-- </a> -->
        </li>
      </ul>
    </div>
  </div>
    
</template>

<script>
export default {
  name: 'City',
  data(){
    return {
      hotList: [],
      cityList: [],
      letterList: [],
      isLoading: true
    }
  },
  methods: {
    scrollToIndex(index){
      var h2 = this.$refs.scroll_list.$el.getElementsByTagName('h2');
      this.$refs.scroll_list.ToScrollTop(-h2[index + 1].offsetTop);
    },
    formatcityList(cities){
      var letters = [];
      var letterList = [];
      for(var i = 65; i < 91; i++){
        letters.push(String.fromCharCode(i));
      }
      var hotList = cities.filter(city => city.id % 10 === 0 && city.id < 90);
      var cityList = [];
      for(var j = 0; j < 26; j++){
        var arr = cities.filter(city => city.py.slice(0,1).toUpperCase() === letters[j]);
        if(arr.length > 0){          
          cityList.push({
            list: arr,
            index: letters[j]
          });
          // arr.splice 删除后的原函数保留原先的 index
          letterList.push(letters[j]);
        }
      }
      return {
        letterList,
        hotList,
        cityList
      }
    },
    handleCity(newNm, newId){
      this.$store.commit("CITY_INFO", {newNm, newId});
      this.$router.push('/movie/nowPlaying');
    }
  },
  mounted() {
    var cityList = localStorage.getItem("cityList");
    var letterList = localStorage.getItem("letterList");
    var hotList = localStorage.getItem("hotList");
    if(cityList && letterList && hotList){
      this.isLoading = false;
      this.cityList = JSON.parse(cityList);
      this.letterList = JSON.parse(letterList);
      this.hotList = JSON.parse(hotList);
    }else{
      this.axios.get('/ajax/dianying/cities.json').then(res => {
        if(res.statusText === "OK"){
          this.isLoading = false;
  
          var cities = res.data.cts;
          localStorage.setItem("cities", JSON.stringify(cities));
          var {letterList, hotList, cityList} = this.formatcityList(cities);
          this.cityList = cityList;
          this.letterList = letterList;
          this.hotList = hotList;
          
          localStorage.setItem("cityList", JSON.stringify(cityList));
          localStorage.setItem("letterList", JSON.stringify(letterList));
          localStorage.setItem("hotList", JSON.stringify(hotList));
        }else{
          console.log("服务器错误")
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid; position: fixed; top: 50%; margin-top: -50%;right: 0; font-size: 14px; background-color: white;}
</style>