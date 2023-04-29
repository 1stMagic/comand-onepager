import { createPinia } from "pinia"
import router from "./router"
import * as components from "comand-component-library"
import ContactForm from "./components/ContactForm.vue"
import LoginArea from "./components/LoginArea.vue"
import TextBlock from "./components/TextBlock.vue"
import directiveTelephone from "comand-component-library/src/directives/telephone"
import directiveFocus from "comand-component-library/src/directives/focus"

export { default as CmdOnePager } from './components/CmdOnePager.vue'
export function bootstrap(app) {
    app.component("ContactForm", ContactForm)
    app.component("LoginArea", LoginArea)
    app.component("TextBlock", TextBlock)
    Object.entries(components).forEach((component) => {
        app.component(component[0], component[1])
    })
    return app
        .use(createPinia())
        .use(router)
        .directive('telephone', directiveTelephone)
        .directive('focus', directiveFocus)
}
