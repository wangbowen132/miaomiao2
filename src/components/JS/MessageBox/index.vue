<template>
  <div class="messagebox">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div>
      <div v-if="cancel" @click="handleCancel">{{cancel}}</div>
      <div v-if="ok" @click="handleOk">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.messagebox{
  height: 120px; 
  width: 200px; 
  border-radius: 4px; 
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -60px;
  text-align: center;
  box-shadow: 2px 2px 4px 2px gray;
}
.messagebox h2{
  font-size: 24px;
  height: 50px;
  line-height: 50px;
  
}
.messagebox p{
  font-size: 18px;
  height: 100%;
}
.messagebox > div {
  position: absolute;
  bottom: 0;
  text-align: center;
  display: flex;
  font-size: 16px;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.messagebox > div div{
  flex: 1;
  border-top: 1px solid gray;
}
.messagebox > div div:nth-child(1){
  border-right: 1px solid gray;
}
</style>