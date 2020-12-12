import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* import css from comand-frontend-framework */
import 'comand-frontend-framework/src/assets/css/normalize.css'
import 'comand-frontend-framework/src/assets/css/framework.css'
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'

/* import css from comand-ui-kit */
import 'comand-ui-kit/src/assets/styles/variables.scss'
import 'comand-ui-kit/src/assets/styles/comand-component-library-structure.scss'
import 'comand-ui-kit/dist/comand-ui-kit.css'

/* import css for onepager */
import '@/assets/styles/onpeager-structure.scss'
import '@/assets/styles/onepager-layout.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
