<template>
  <div class="container">
    <div style="text-align: center;">
      <img class="img-logo" src="@/assets/iotLogo.png" alt="">
    </div>
    <div class="input-box">
      <div class="title">公司名：</div>
      <el-input v-model="json.company" />
    </div>
    <div class="input-box">
      <div class="title">姓名：</div>
      <el-input v-model="json.name" />
    </div>
    <div class="input-box">
      <div class="title">职位信息：</div>
      <el-input v-model="json.title" />
    </div>
    <div class="input-box">
      <div class="title">手机号：</div>
      <el-input v-model="json.contact" />
    </div>
    <div style="text-align: center;">
      <el-button type="primary" class="button" @click="startTransilate">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import { reactive ,onMounted} from 'vue'
const router = useRouter()

interface json {
  name: string;
  company: string;
  title: string;
  contact: any;
}

let json : json = reactive({
  name:'',
  company :'',
  title:'',
  contact:'',
})

function startTransilate(){
  // console.log(json)
  // router.push('/PDFView')
  // return
  var reg = /^1[3456789]\d{9}$/;
  if(reg.test(json.contact)){
    $.ajax({
      type: "POST",
      url: '/v1/guest/save',
      timeout: 20000, // 超时时间 10 秒
      headers : {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(json),
      success: function (res) {
        router.push('/PDFView')
      },
      error:function (res) {
        console.log(res)
      }
    });
  }else{
    ElMessage({
      message: '手机号格式不正确',
      type: 'warning',
    })
  }
  // router.push('/PDFView')
  // return
}


</script>

<style scoped>
.img-logo{
  width: 160px;
  height: 160px;
}
.container{
  padding: 24px 12px;
  background-color: #374198;
  width: 100%;
  height: 100%;
}
.title{
  margin-top: 24px;
  margin-bottom: 6px;
  color: white;
}
.input-box{
  padding: 6px 12px;
}
.button{
  width: 240px;
  margin-top: 24px;
  height: 40px;
}
</style>
