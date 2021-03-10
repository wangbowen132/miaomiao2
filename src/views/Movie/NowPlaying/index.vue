<template>
  <MovieList ref="movie_list" sellclass="btn_mall" sellname= "购票" :moviedata="moviedata" :key="moviedata.length" :isLoading="isLoading"></MovieList>
</template>

<script>
import MovieList from '@/components/MovieList'
export default {
  name: 'NowPlaying',
  data(){
    return {
      moviedata: [],
      isLoading: true
    }
  },
  components: {
    MovieList
  },
  mounted() {
    this.axios.get("/ajax/ajax/movieOnInfoList?token=&optimus_uuid=94144F907D8A11EB82EC9797BBCD89ABD7C1EA8D9C2149769E6DE86735E343AE").then(res => {
      if(res.statusText === "OK"){
        this.isLoading = false;
        this.moviedata = res.data.movieList;
      }else{
        console.log("服务器错误")
      }
    })
  },
}
</script>

<style lang="scss" scoped>


</style>