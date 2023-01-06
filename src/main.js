import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
// import DataV, { setClassNamePrefix } from '@dataview/datav-vue3';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
// app.use(DataV, { classNamePrefix: 'dv-' });

axios.defaults.baseURL = 'http://localhost:3000/'
app.config.globalProperties.$http = axios

app.mount('#app')
