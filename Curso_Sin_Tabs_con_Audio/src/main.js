import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Unicon from 'vue-unicons'
import {
  uniPlay,
  uniPause,
  uniSquareFull
} from 'vue-unicons/src/icons'

Unicon.add([uniPlay, uniPause, uniSquareFull])
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Unicon)
new Vue({
  render: h => h(App),
}).$mount('#app')