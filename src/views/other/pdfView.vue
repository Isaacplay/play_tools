<template>
  <div class="pdf_class">
    <!-- <div class="box">
      <img class="img-class" src="@/assets/导轨表系列单页-英文.png">
    </div> -->
    <div class="box">
      <img class="img-class" src="@/assets/导轨表系列单页-中文.png">
    </div>
    <div class="box">
      <img class="img-class" src="@/assets/光伏智能终端-中文.png">
    </div>
    <div class="box">
      <img class="img-class" src="@/assets/逆变器数据采集棒-中文.png">
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, toRaw, ref } from "vue";

function download(){
}
</script>

<style scoped>
.pdf_class {
  padding: 24px 12px;
  background-color: #374198;
  width: 100%;
  height: 100%;
  text-align: center;
}
.box{
  padding-top: 50px;
  width: 100%;
  text-align: center;
  color: white;
}
.img-class{
  width: 40%;
  height: auto;
}
.btn{
  position: sticky;
  bottom: 12px;
  right: 12px;
}
</style>
