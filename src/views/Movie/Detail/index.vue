<template>
  <div id="detailContainer" class="slide-move">
    <Header title="影片详情">
			<i class="iconfont icon-right" @click="handleToBack"></i>
    </Header>
		<Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="datalist.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{datalist.name}}</h2>
						<p>A Cool Fish</p>
						<p>{{datalist.grade}}分</p>
						<p>{{datalist.category}}</p>
						<p>{{datalist.nation}} / {{datalist.runtime}}分钟</p>
						<p>{{datalist.premiereAt | dateTransform}}上映</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{datalist.synopsis}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(data,index) in datalist.actors" :key="index">
						<div>
							<img :src="data.avatarAddress" alt="">
						</div>
						<p>{{data.name}}</p>
						<p>{{data.role}}</p>
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
	props: ['id'],
	data(){
		return {
			datalist: {},
			isLoading: true
		}
	},
  components: {
    Header
  },
	methods: {
		handleToBack(){
			this.$router.back();
		}
	},
	filters:{
		dateTransform: function(date){
			date = new Date(date * 12 * 60);
			return function (date) {  
				var y = date.getFullYear();  
				var m = date.getMonth() + 1;  
				m = m < 10 ? '0' + m : m;  
				var d = date.getDate();  
				d = d < 10 ? ('0' + d) : d;  
				return y + '-' + m + '-' + d;  
			}(date);
		}
	},
	mounted(){

		this.axios({
			url:`https://m.maizuo.com/gateway?filmId=${53 + this.id.slice(-3,-1)}&k=346284`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1614655222709816360108033","bc":"440100"}',
				'X-Host': 'mall.film-ticket.film.info'
			}
		}).then(res => {
			if(res.data.msg == "ok"){
				this.isLoading = false;
				this.datalist = res.data.data.film;
				this.$nextTick(() => {
					/* eslint-disable-next-line */
					new Swiper(this.$refs.detail_player , {
						slidesPerView : 'auto',
						freeMode : true,
						freeModeSticky: true
					});
				});
			}
		})
	}
}
</script>

<style lang="scss" scoped>
.slide-move{
	animation: .3s slideMove;
}
@keyframes slideMove {
	0%{
		transform: translateX(100%)
	}
	100%{
		transform: translateX(0)
	}
}
#detailContainer{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background-color: white;
}

#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

</style>