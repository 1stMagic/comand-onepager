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
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"

/* import directives */
// directive to format telephone- and fax-number
import directiveTelephone from "comand-component-library/src/directives/telephone"
// directive to set focus on specific form-elements
import directiveFocus from "comand-component-library/src/directives/focus"

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
import './assets/styles/onepager-structure.scss'
import './assets/styles/onepager-layout.scss'

import * as components from "comand-component-library"
import ContactForm from "./components/ContactForm.vue"

const app = createApp(App)

app.component("ContactForm", ContactForm)
Object.entries(components).forEach((component) => {
    app.component(component[0], component[1])
})
app.use(createPinia())
    .use(router)
    .directive('telephone', directiveTelephone)
    .directive('focus', directiveFocus)
    .mount('#app')
