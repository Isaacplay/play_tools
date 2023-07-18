import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from './router/index'
import './utils/css/base.css'
import $ from 'jquery'
import vue3TsJsoneditor from 'vue3-ts-jsoneditor';


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use($)

app.use(vue3TsJsoneditor, {
  componentName: '/JsonEditor/', // Default: 'JsonEditor',
  options: {
    /**
     *
     * SET GLOBAL OPTIONS
     *
     * */
    readOnly:true,
  }
});

app.mount('#app')

