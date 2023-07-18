<template>
  <div class="container">
   
  </div>
</template>

<script setup lang="ts">
import { reactive,nextTick } from 'vue'
import {useRoute,useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()


</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
}
</style>
