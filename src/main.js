import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import Axios from 'axios'

import './assets/main.css'

//引入饿了么UI的CSS样式
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

Axios.defaults.baseURL = ""
app.config.globalProperties.$axios = Axios

app.use(router)
app.use(ElementPlus)

app.mount('#app')
