import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Unicon from 'vue-unicons'
import Autenticacion from "./components/Autenticacion";
import {
  uniPlay,
  uniPause,
  uniSquareFull
} from 'vue-unicons/src/icons'
import VueRouter from 'vue-router'
import oauth from "./components/OAuth.vue"

Unicon.add([uniPlay, uniPause, uniSquareFull])
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Unicon)
Vue.use(VueRouter)


const routes = [{
  path: '/auth',
  component: oauth
}, {
  path: '/',
  component: Autenticacion
}]

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')