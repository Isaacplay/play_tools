<template>
  <div>
    <div class="tips-box">
      翻译用于i18n的JSON文件,json最多支持2级 <br/>
      需要准备一个百度翻译的API <a href="https://fanyi-api.baidu.com/manage/developer">百度翻译开发者中心</a> <br/>
      语种参考 <a href="https://fanyi-api.baidu.com/doc/21">百度翻译文档 - 常见语种列表</a>
    </div>
    <div class="container">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeAvatarUpload"
      >
        <div v-if="json.name">{{json.name}}</div>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div class="json-con">
        <div v-show="json.name.length > 0" class="json-origin">
          <vue-jsoneditor
            height="1200"
            mode="text"
            v-model:json="json.content" 
          />
        </div>
        <div v-show="json.name.length > 0" class="middle-box">
          <div>
            <div>百度翻译 APP ID</div>
            <el-input v-model="json.appid" />
          </div>
          <div>
            <div>密钥</div>
            <el-input type="password" v-model="json.mishi" />
          </div>
          <div>
            <div>原语言</div>
            <el-input v-model="json.oriLan" />
          </div>
          <div>
            <div>目标语言</div>
            <el-input v-model="json.newLan" />
          </div>
          <el-button @click="startTransilate">Strat</el-button>
        </div>
        <div v-show="json.end" class="json-new">
          <vue-jsoneditor
            height="1200"
            mode="text"
            v-model:json="json.endContent" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive ,onMounted} from 'vue'
import { ElMessage  } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type {  UploadProps } from 'element-plus'
import VueJsoneditor from 'vue3-ts-jsoneditor'
import { Md5 } from 'ts-md5';

interface json {
  name: string;
  content: {
    [key: string]: string | object,
  };
  endContent: {
    [key: string]: string | object,
  };
  oriLan: string;
  newLan: string;
  end: boolean;
  appid: string;
  mishi: string;
}

let json : json = reactive({
  name:'',
  content :{},
  endContent:{},
  oriLan:'zh',
  newLan:'spa',
  end:false,
  appid:'',
  mishi:''
})

onMounted(() => {
})


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'application/json') {
    json.name = rawFile.name
    const reader = new FileReader()
    reader.readAsText(rawFile)
    reader.onload = function () {
      json.content = JSON.parse(this.result as string)
      console.log(json)
    }
  } else{
    ElMessage.error('Only support JSON file!')
  }
  return false
}

function startTransilate(){
  let time = 1
  for(let i in json.content){
    if(typeof json.content[i] == 'string'){
      setTimeout(()=>{
        transilateItem([i],json.content[i] as string)
      },time * 2000)
      time ++ 
    }else if (typeof json.content[i]  == 'object'){
      for(let k in json.content[i] as Object){
        if(typeof json.content[i as keyof typeof json.content][k as keyof typeof json.content.i]  == 'string'){
          setTimeout(()=>{
            transilateItem([i,k],json.content[i as keyof typeof json.content][k as keyof typeof json.content.i])
          },time * 2000)
          time ++ 
        }       
      }
    }
  }
  json.end = true
}

function transilateItem(key : Array<string>,value : string){
  // console.log(key,value)
  let query = value
  let salt = new Date().getTime()
  let sign = Md5.hashStr(`${json.appid}${query}${salt}${json.mishi}`).toLowerCase()
  let data = {
    q:query,
    from:json.oriLan || 'auto',
    to:json.newLan,
    appid:json.appid,
    salt:salt,
    sign:sign,
  }
  $.ajax({
    type: "POST",
    url: '/api/trans/vip/translate',
    timeout: 20000, // 超时时间 10 秒
    headers : {
    "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
    success: function (res) {
      if(key.length == 1){
        json.endContent[key[0]] = res.trans_result[0].dst
      }else if (key.length == 2){
        if(json.endContent[key[0]] == undefined){
          json.endContent[key[0]] = {}
        }
        json.endContent.key[0].key[1] = res.trans_result[0].dst
      }
    },
    error:function (res) {
      console.log(res)
    }
  });
}
</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.json-con{
  margin: 12px;
  padding: 12px;
  width: 100%;
  display: flex;
}
.json-origin{
  width: 45%;
  border-radius: 4px;
  border: 1px solid rgb(148, 128, 128);
}
.json-new{
  width: 45%;
  border-radius: 4px;
  border: 1px solid rgb(148, 128, 128);
}
.middle-box{
  width: 20%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.middle-box > div{
  margin: 24px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
