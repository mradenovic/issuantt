import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VueAnalytics from 'vue-analytics'

sync(store, router) // done. Returns an unsync callback fn

Vue.config.productionTip = false

const id = process.env.VUE_APP_GOOGLE_ANALYTICS_ID
id && Vue.use(VueAnalytics, {
  id: id,
  router: router
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
