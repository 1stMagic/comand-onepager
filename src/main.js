/* begin imports css from comand-frontend-framework ---------------------------------------------------------------------------------------- */
/* import normalize to set same default styles for all browsers */
import 'comand-frontend-framework/src/assets/css/normalize.css'

/* import framework-styles */
import 'comand-frontend-framework/src/assets/css/framework.css'

/* import breakpoints */
import 'comand-frontend-framework/src/assets/css/breakpoints.css'

/* import framework-iconfont */
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'
/* end imports css from comand-frontend-framework ---------------------------------------------------------------------------------------- */

import { createApp } from "vue"
import App from "./App.vue"

/* import additional iconfont containing company-logos */
import 'comand-component-library/src/assets/styles/logos-iconfont.css'

/* import css for global-styles */
import 'comand-component-library/src/assets/styles/global-styles.scss'

/* import css for global transitions */
//import 'comand-component-library/src/assets/styles/transitions.scss'

/* import generated css from components */
import 'comand-component-library/dist/style.css'

/* import css for your custom styles */
import 'comand-component-library/src/assets/styles/template.css'

/* import css for onepager */
import './assets/styles/onepager-global-styles.scss'

import {bootstrap} from "./index.js";

const app = createApp(App)

bootstrap(app).mount('#app')
