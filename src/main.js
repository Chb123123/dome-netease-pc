import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
// import DataV, { setClassNamePrefix } from '@dataview/datav-vue3';
// 导入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
// app.use(DataV, { classNamePrefix: 'dv-' });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// axios.defaults.baseURL = 'http://localhost:3000/'
// app.config.globalProperties.$http = axios

app.mount('#app')
