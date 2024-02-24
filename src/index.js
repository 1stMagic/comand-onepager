import {createPinia} from "pinia"
import router from "./router"
import * as components from "comand-component-library"

// import local components
import ContactForm from "./components/ContactForm.vue"
import LoginArea from "./components/LoginArea.vue"

// import settings-components
import CmdToggleDarkModeSettings from "./components/editmode/component-settings/CmdToggleDarkModeSettings.vue"
import CmdSocialNetworksSettings from "./components/editmode/component-settings/CmdSocialNetworksSettings.vue"
import CmdThumbnailScrollerSettings from "./components/editmode/component-settings/CmdThumbnailScrollerSettings.vue"
import ContactFormSettings from "./components/editmode/component-settings/ContactFormSettings.vue"
import CmdSlideshowSettings from "./components/editmode/component-settings/CmdSlideshowSettings.vue"
import CmdListOfLinksSettings from "./components/editmode/component-settings/CmdListOfLinksSettings.vue"
import CmdLinkItemSettings from "./components/editmode/component-settings/CmdLinkItemSettings.vue"
import CmdOpeningHoursSettings from "./components/editmode/component-settings/CmdOpeningHoursSettings.vue"
import CmdAddressDataSettings from "./components/editmode/component-settings/CmdAddressDataSettings.vue"
import CmdAddressDataItemSettings from "./components/editmode/component-settings/CmdAddressDataItemSettings.vue"
import CmdImageGallerySettings from "./components/editmode/component-settings/CmdImageGallerySettings.vue"
import CmdImageSettings from "./components/editmode/component-settings/CmdImageSettings.vue"
import CmdHeadlineSettings from "./components/editmode/component-settings/CmdHeadlineSettings.vue"
import CmdTextImageBlockSettings from "./components/editmode/component-settings/CmdTextImageBlockSettings.vue"
import SectionSettings from "./components/editmode/component-settings/SectionSettings.vue"
import CmdContainerSettings from "./components/editmode/component-settings/CmdContainerSettings.vue"

// import directives from comand-component-library
import directiveTelephone from "comand-component-library/src/directives/telephone"
import directiveFocus from "comand-component-library/src/directives/focus"

export {default as CmdOnePager} from './components/CmdOnePager.vue'

export function bootstrap(app) {
    Object.entries({
        ContactForm,
        LoginArea,
        CmdToggleDarkModeSettings,
        CmdImageGallerySettings,
        CmdImageSettings,
        CmdThumbnailScrollerSettings,
        CmdListOfLinksSettings,
        CmdLinkItemSettings,
        CmdAddressDataSettings,
        CmdAddressDataItemSettings,
        CmdOpeningHoursSettings,
        CmdHeadlineSettings,
        CmdTextImageBlockSettings,
        SectionSettings,
        CmdSocialNetworksSettings,
        CmdSlideshowSettings,
        ContactFormSettings,
        CmdContainerSettings
    }).forEach(([name, component]) => app.component(name, component))

    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
    })

    return app
        .use(createPinia())
        .use(router)
        .directive('telephone', directiveTelephone)
        .directive('focus', directiveFocus)
}
