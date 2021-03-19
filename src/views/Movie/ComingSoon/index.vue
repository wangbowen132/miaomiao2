<template>
  <MovieList sellclass="btn_pre" sellname= "预售" :moviedata="moviedata" :key="moviedata.length" :isLoading="isLoading"></MovieList>
</template>

<script>
import MovieList from '@/components/MovieList'
export default {
  name: 'ComingSoon',
  data(){
    return {
      moviedata: [],
      isLoading: true,
      prevCityId: -2
    }
  },
  components: {
    MovieList
  },
  activated() {

    var newId = localStorage.getItem('newId');
    if(newId == null){
      newId = 1;
    }
    if(newId === this.prevCityId){ return; }

    this.axios.get(`/ajax/ajax/comingList?ci=${newId}&token=`).then(res => {
      if(res.statusText === "OK"){
        this.isLoading = false;
        this.prevCityId = newId;
        this.moviedata = res.data.coming
      }else{
        console.log("服务器错误")
      }
    })
  },
}

</script>

<style lang="scss" scoped>


</style>