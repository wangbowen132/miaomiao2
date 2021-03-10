<template>
  <div class="loader">加载中...</div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style lang="scss">
.loader,
.loader:before,
.loader:after {
  background: #87CEEB;
  /*
  * load1：执行的动画名
  * 1s：执行一秒
  * infinite：执行无限次
  * ease-in-out：动画以低速开始和结束
  */
  animation: loadingOne 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader:before,
.loader:after {
  position: absolute;
  content: '';
  top: 0;
}
.loader:before {
  left: -1.5em;
}
.loader {
  text-indent: -9999em;
  margin: 40% auto;
  position: relative;
  font-size: 11px;
  /* 延时0.16s */
  animation-delay: 0.16s;
}
.loader:after {
  left: 1.5em;
  /* 延时0.32s */
  animation-delay: 0.32s;
}
@keyframes loadingOne {
  0%,
  80%,
  100% {
    box-shadow: 0 0 #87CEEB;
    height: 4em;
  }
  40% {
	/* 实现上部拉伸 */
    box-shadow: 0 -2em #87CEEB;
	/* 实现下部拉伸 */
    height: 5em;
  }
}
</style>