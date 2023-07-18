<template>
  <div class="container">
    <div class="memu-item" v-for="(item,index) in menuList" :key="index" @click="gotoMenuAction(item)" >
      {{item.name}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive,nextTick } from 'vue'
import {useRoute,useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()

const menuList = reactive(
  [
    {name:'i18N翻译',key:'i18n',path:'/transportI18n'},
    {name:'JSON合并',key:'jsonToexcel',path:'/jsonToexcel'},
    {name:'Template',key:'tem',path:'/Template'},
    {name:'ThreeJS',key:'ThreeJS',path:'/ThreeJS'},
    {name:'biligoods',key:'biligoods',path:'/biligoods'},
  ]
)

function gotoMenuAction(item:any){
  router.push(item.path)
}
</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
}
.memu-item{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 12px;
  margin-right: 30px;
  border: 2px solid #409eff;
}
</style>
