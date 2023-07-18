<template>
   <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  function setSize(){
    let whdef = 75/1000; //表示高 1000 的设计图，使用75px的默认值
    let h = window.innerHeight;
    let w = window.innerWidth;
    let rem = h * whdef;
    $('html').css('font-size',rem + "px")
  }
  setSize()
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

</style>
