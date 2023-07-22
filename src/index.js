import { createPinia } from "pinia"
import router from "./router"
import * as components from "comand-component-library"
import ContactForm from "./components/ContactForm.vue"
import LoginArea from "./components/LoginArea.vue"
import CmdTextImageBlock from "./components/CmdTextImageBlock.vue"
import CmdHeadline from "./components/CmdHeadline.vue"
import CmdImage from "./components/CmdImage.vue"
import CmdImageGallery from "./components/CmdImageGallery.vue"
import CmdSocialNetworks from "./components/CmdSocialNetworks.vue"
import CmdSocialNetworksSettings from "./components/editmode/component-settings/CmdSocialNetworksSettings.vue"
import CmdThumbnailScroller from "./components/CmdThumbnailScroller.vue"
import CmdThumbnailScrollerSettings from "./components/editmode/component-settings/CmdThumbnailScrollerSettings.vue"
import ContactFormSettings from "./components/editmode/component-settings/ContactFormSettings.vue"
import CmdSlideShow from "./components/CmdSlideShow.vue"
import CmdImageGallerySettings from "./components/editmode/component-settings/CmdImageGallerySettings.vue"
import CmdImageSettings from "./components/editmode/component-settings/CmdImageSettings.vue"
import CmdHeadlineSettings from "./components/editmode/component-settings/CmdHeadlineSettings.vue"
import CmdTextImageBlockSettings from "./components/editmode/component-settings/CmdTextImageBlockSettings.vue"
import directiveTelephone from "comand-component-library/src/directives/telephone"
import directiveFocus from "comand-component-library/src/directives/focus"

export { default as CmdOnePager } from './components/CmdOnePager.vue'

export function bootstrap(app) {
    app.component("ContactForm", ContactForm)
    app.component("LoginArea", LoginArea)
    app.component("CmdHeadline", CmdHeadline)
    app.component("CmdTextImageBlock", CmdTextImageBlock)
    app.component("CmdImage", CmdImage)
    app.component("CmdImageGallery", CmdImageGallery)
    app.component("CmdImageGallerySettings", CmdImageGallerySettings)
    app.component("CmdImageSettings", CmdImageSettings)
    app.component("CmdThumbnailScroller", CmdThumbnailScroller)
    app.component("CmdThumbnailScrollerSettings", CmdThumbnailScrollerSettings)
    app.component("CmdSlideShow", CmdSlideShow)
    app.component("CmdHeadlineSettings", CmdHeadlineSettings)
    app.component("CmdTextImageBlockSettings", CmdTextImageBlockSettings)
    app.component("CmdSocialNetworks", CmdSocialNetworks)
    app.component("CmdSocialNetworksSettings", CmdSocialNetworksSettings)
    app.component("ContactFormSettings", ContactFormSettings)
    Object.entries(components).forEach((component) => {
        if(component[0] !== "CmdHeadline" &&
            component[0] !== "CmdImage" &&
            component[0] !== "CmdImageGallery" &&
            component[0] !== "CmdThumbnailScroller" &&
            component[0] !== "CmdSlideShow" &&
            component[0] !== "CmdSocialNetworks"
        ) {
            app.component(component[0], component[1])
        }
    })
    return app
        .use(createPinia())
        .use(router)
        .directive('telephone', directiveTelephone)
        .directive('focus', directiveFocus)
}
