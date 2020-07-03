import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msg'
import './config/axios'
import './config/mq'
import store from  './config/store'
import router from  './config/router'
import i18n from './config/i18n'


Vue.config.productionTip = false

// TEMP LOGIN
//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkJydW5vIEZlcnJlaXJhIiwiZW1haWwiOiJicnVub2ZlcnJlaXJhODZtYWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1OTIzNTE5ODcsImV4cCI6MTU5MjYxMTE4N30.seDmdlMbZ3kvsCYhvFukxo5sJR6gF-FUmFOYtv0ptaA'

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

console.log('hot', module)