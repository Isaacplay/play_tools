<template>
  <div>
    <div class="tips-box">
      简单做的,将2个用于i18n的json文件匹配词条,合并成一个excel导出 <br>
      主要是给前方或者翻译人员提供项目的现有翻译来进行纠错
    </div>
    <div class="container">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div style="margin: 0 12px;"></div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :limit="1"
        :before-upload="beforeAvatarUpload2"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
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
import { reactive } from 'vue'
import { ElMessage  } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type {  UploadProps } from 'element-plus'
import VueJsoneditor from 'vue3-ts-jsoneditor'
import { Excel, type mergeListType } from '@/utils/js/excel';

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
const beforeAvatarUpload2: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'application/json') {
    json.name = rawFile.name
    const reader = new FileReader()
    reader.readAsText(rawFile)
    reader.onload = function () {
      json.endContent = JSON.parse(this.result as string)
      json.end = true
      console.log(json)
    }
  } else{
    ElMessage.error('Only support JSON file!')
  }
  return false
}


function startTransilate(){
  const header = ['key', 'key1', 'key2'];
  const customHeader = ['key', 'en', 'pt'];
  let tableData : any = []
  for(let i in json.content){
    if (typeof json.content[i]  == 'object'){
      let map = {
        key:i,
        key1:'--',
        key2:'--',
      } 
      tableData.push(map)
      for(let k in json.content[i] as Object){
        let map = {
          key:k,
          key1:json.content[i as keyof typeof json.content][k as keyof typeof json.content.i],
          key2:json.endContent[i as keyof typeof json.content][k as keyof typeof json.content.i],
        } 
        tableData.push(map)
      }
    }
    
  }
  console.log(tableData)
  const exportExcel = () => {
    const excel = new Excel();
    excel.exportExcel({
      name: '个人信息',
      title: '标题',
      data: tableData,
      header,
      customHeader,
    })
  }
  exportExcel()
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
