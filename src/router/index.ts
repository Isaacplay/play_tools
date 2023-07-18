import { resolve } from 'path-browserify';
import * as VueRouter from 'vue-router';
const questionnaire = () => import('@/views/questionnaire.vue')

const Home = {path:'/',name:'home',meta:{title:'home'},component:() => import('@/views/home.vue')}
const transport = {path:'/transportI18n',name:'transportI18n',meta:{title:'transportI18n'},component:() => import('@/views/i18n/index.vue')}
const jsonToexcelPage = {path:'/jsonToexcel',name:'jsonToexcel',meta:{title:'jsonToexcel'},component:() => import('@/views/jsonToexcel/index.vue')}
const Template = {path:'/template',name:'template',meta:{title:'template'},component:() => import('@/views/template/index.vue')}
const ThreeJS = {path:'/ThreeJS',name:'ThreeJS',meta:{title:'ThreeJS'},component:() => import('@/views/ThreeJS/index.vue')}
const PDFView = {path:'/PDFView',name:'PDFView',meta:{title:'PDFView'},component:() => import('@/views/other/pdfView.vue')}
const biligoods = {path:'/biligoods',name:'biligoods',meta:{title:'biligoods'},component:() => import('@/views/biligoods/index.vue')}



const routes = [ Home,transport,Template,jsonToexcelPage,ThreeJS,PDFView,biligoods]

export const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
