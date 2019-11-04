import Vue from 'vue'
import Layout from './Layout'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(fas)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Layout)
})
