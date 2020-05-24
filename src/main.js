import Vue from 'vue'
import App from './App'
import VueExpandFn from '@/assets/js/vueExpandFn.js'

Vue.config.productionTip = false
App.mpType = 'app'


Vue.use(VueExpandFn)

const app = new Vue(App)
app.$mount()
