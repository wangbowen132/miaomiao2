<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// 自动处理 better scroll 可滚动高/宽度
import ObserveDom from '@better-scroll/observe-dom'
BScroll.use(ObserveDom);
export default {
  props: {
    handleScroll: {
      type:Function,
      default: function(){}
    },
    handleTouchEnd: {
      type:Function,
      default: function(){}
    }
  },
  methods: {
    ToScrollTop(y){
      this.scroll.scrollTo(0,y)
    }
  },
  mounted() {
    this.$nextTick(() => {
      var scroll = new BScroll('.wrapper', {
        click: true,
        mouseWheel: true,
        probeType: 3,
        observeDOM: true
      });
      this.scroll = scroll;
      scroll.on('scroll', (pos) => {
        this.handleScroll(pos)
      });
      scroll.on('touchEnd', (pos) => {
        this.handleTouchEnd(pos)
      })

    })
  }
}
</script>

<style lang="scss" scoped>

.wrapper{height: 100%; overflow: hidden;}
</style>