// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './router'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.config.productionTip = false

const router = new Router({
  routes // short for `routes: routes`
})

// Vue.use(VueI18n)

Vue.use(VueI18n)
// Vue.locale = 'pt-br'
const i18n = new VueI18n({
  locale: 'pt-br'
})

axios.defaults.baseURL = 'http://localhost:3333'

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')