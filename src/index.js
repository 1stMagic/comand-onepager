import { createPinia } from "pinia"
import router from "./router"
import * as components from "comand-component-library"
import ContactForm from "./components/ContactForm.vue"
import LoginArea from "./components/LoginArea.vue"
import CmdTextImageBlock from "./components/CmdTextImageBlock.vue"
import CmdHeadline from "./components/CmdHeadline.vue"
import CmdAddressData from "./components/CmdAddressData.vue"
import CmdImage from "./components/CmdImage.vue"
import CmdImageGallery from "./components/CmdImageGallery.vue"
import CmdSocialNetworks from "./components/CmdSocialNetworks.vue"
import CmdSocialNetworksSettings from "./components/editmode/component-settings/CmdSocialNetworksSettings.vue"
import CmdThumbnailScroller from "./components/CmdThumbnailScroller.vue"
import CmdThumbnailScrollerSettings from "./components/editmode/component-settings/CmdThumbnailScrollerSettings.vue"
import ContactFormSettings from "./components/editmode/component-settings/ContactFormSettings.vue"
import CmdSlideshow from "./components/CmdSlideshow.vue"
import CmdListOfLinks from "./components/CmdListOfLinks.vue"
import CmdListOfLinksSettings from "./components/editmode/component-settings/CmdListOfLinksSettings.vue"
import CmdLinkItemSettings from "./components/editmode/component-settings/CmdLinkItemSettings.vue"
import CmdOpeningHours from "./components/CmdOpeningHours.vue"
import CmdOpeningHoursSettings from "./components/editmode/component-settings/CmdOpeningHoursSettings.vue"
import CmdAddressDataSettings from "./components/editmode/component-settings/CmdAddressDataSettings.vue"
import CmdImageGallerySettings from "./components/editmode/component-settings/CmdImageGallerySettings.vue"
import CmdImageSettings from "./components/editmode/component-settings/CmdImageSettings.vue"
import CmdHeadlineSettings from "./components/editmode/component-settings/CmdHeadlineSettings.vue"
import CmdTextImageBlockSettings from "./components/editmode/component-settings/CmdTextImageBlockSettings.vue"
import directiveTelephone from "comand-component-library/src/directives/telephone"
import directiveFocus from "comand-component-library/src/directives/focus"

export { default as CmdOnePager } from './components/CmdOnePager.vue'

export function bootstrap(app) {
    Object.entries({
        ContactForm,
        LoginArea,
        CmdHeadline,
        CmdAddressData,
        CmdTextImageBlock,
        CmdImage,
        CmdImageGallery,
        CmdImageGallerySettings,
        CmdImageSettings,
        CmdThumbnailScroller,
        CmdThumbnailScrollerSettings,
        CmdSlideshow,
        CmdListOfLinks,
        CmdListOfLinksSettings,
        CmdLinkItemSettings,
        CmdOpeningHours,
        CmdAddressDataSettings,
        CmdOpeningHoursSettings,
        CmdHeadlineSettings,
        CmdTextImageBlockSettings,
        CmdSocialNetworks,
        CmdSocialNetworksSettings,
        ContactFormSettings
    }).forEach(([name, component]) => app.component(name, component))

    const componentLibraryComponentBlacklist = [
        "CmdHeadline",
        "CmdImage",
        "CmdImageGallery",
        "CmdThumbnailScroller",
        "CmdSlideshow",
        "CmdSocialNetworks",
        "CmdListOfLinks",
        "CmdAddressData",
        "CmdOpeningHours"
    ]
    Object.entries(components).forEach(([name, component]) => {
        if (!componentLibraryComponentBlacklist.includes(name)) {
            app.component(name, component)
        }
    })

    return app
        .use(createPinia())
        .use(router)
        .directive('telephone', directiveTelephone)
        .directive('focus', directiveFocus)
}
