import Vue from 'vue'
import App from './App'
import VueExpandFn from '@/assets/js/vueExpandFn.js'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

//设置系统信息
store.dispatch("setSystemInfo")
        
Vue.use(VueExpandFn)

const app = new Vue(App)
app.$mount()
