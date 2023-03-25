<template>
    <!-- begin page-wrapper -->
    <div :class="{'edit-mode': editMode}" id="page-wrapper" :style="{'scroll-padding-top': heightSiteHeader + 'px'}">
        <a id="anchor-back-to-top"></a>
            <!-- begin cmd-site-header -->
            <CmdSiteHeader :cmd-main-navigation="{navigationEntries: mainNavigation, closeOffcanvas: { iconClass: 'icon-cancel', text: 'Close nase', showText: true}}" :navigationInline="site.siteHeader?.navigationInline">
                <template v-slot:top-header>
                    <!-- begin cmd-list-of-links (for top-header-navigation) -->
                    <CmdListOfLinks
                        v-if="topHeaderNavigationData"
                        :links="topHeaderNavigationData"
                        orientation="horizontal"
                        align="right"
                    />
                    <!-- end cmd-list-of-links (for top-header-navigation) -->
                </template>
                <template v-slot:logo>
                    <!-- begin cmd-company-logo -->
                    <CmdCompanyLogo
                        v-if="companyLogo.pathDefaultLogo"
                        :altText="companyLogo.altText"
                        :pathDefaultLogo="companyLogo.pathDefaultLogo"
                        :pathDarkmodeLogo="companyLogo.pathDarkmodeLogo"
                    />
                    <!-- end cmd-company-logo -->
                </template>
            </CmdSiteHeader>
            <!-- end cmd-site-header -->

            <!-- begin inner-wrapper -->
            <InnerWrapper/>
            <!-- end inner-wrapper -->

            <!-- begin cmd-site-footer -->
            <CmdSiteFooter>
                <component
                    v-for="(component, index) in site.siteFooter?.components || []" :key="index"
                    :is="component.name"
                    v-bind="component.props"
                    v-on="handlers(component)"
                >
                    <component
                        v-for="(childComponent, childComponentIndex) in component.components || []"
                        :key="childComponentIndex" :is="childComponent.name"
                        v-bind="childComponent.props"
                        v-on="handlers(childComponent)"
                        :editContent="childComponent.editContent" />
                </component>
            </CmdSiteFooter>
            <!-- end cmd-site-footer -->

            <!-- begin cmd-copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation/>
            <!-- end cmd-copyright-information DO NOT REMOVE -->

            <!-- begin cmd-back-to-top-button -->
            <CmdBackToTopButton href="#anchor-back-to-top" :iconBackToTop="iconBackToTop" parent-selector="#page-wrapper"/>
            <!-- end cmd-back-to-top-button -->

        <!-- begin cmd-fancy-box -->
        <CmdFancyBox :show="fancyBoxCookieDisclaimer" :fancyboxOptions="{}" :allowEscapeKey="false">
            <!-- begin cmd-cookie-disclaimer -->
            <CmdCookieDisclaimer
                buttonLabelAcceptAllCookies="Accept all cookies"
                buttonLabelAcceptCurrentSettings="Accept current settings"
                @closeCookieDisclaimer="closeCookieDisclaimer"
                :cookieOptions="cookieDisclaimerData"/>
            <!-- end cmd-cookie-disclaimer -->
        </CmdFancyBox>
        <!-- end cmd-fancy-box -->
    </div>
    <!-- end page-wrapper -->
</template>

<script>
// import components from comand-component-library
import {openFancyBox} from 'comand-component-library'

// import used data
import addressDataData from './assets/data/address-data.json'
import cookieDisclaimerData from './assets/data/cookie-disclaimer.json'
import languagesData from './assets/data/languages.json'
import openingHoursData from './assets/data/opening-hours.json'

// import functions
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "./stores/pinia"
import {loadMetaData} from "./utils/metaData"
import {listOfLinksClient} from "./api/ListOfLinksClient"

// import mixins
import BaseI18nComponent from "./components/mixins/BaseI18nComponent"

export default {
    mixins: [
        BaseI18nComponent
    ],
    data() {
        return {
            addressDataData,
            cookieDisclaimerData,
            fancyBoxCookieDisclaimer: true,
            footerNavigationData: [],
            languagesData,
            openingHoursData,
            topHeaderNavigationData: [],
            currentUrlHash: location.hash,
            heightSiteHeader: 150
        }
    },
    created() {
        // register event-listener to check if location.hash has changed, so 'active'-class for navigation can be set correctly
        addEventListener("hashchange", this.onLocationHashChanged)

        // load labels and section-content from store
        this.loadLabels()

        // save privacy settings
        this.fancyBoxCookieDisclaimer = localStorage.getItem('onepagerPrivacySettingsAccepted') !== "true"
    },
    mounted() {
        const siteHeader = document.getElementsByClassName("cmd-site-header")

        const resizeObserver = new ResizeObserver(entries => {
            // get height of seit header to set scroll-padding on #page-wrapper
            this.heightSiteHeader = entries[0].target.offsetHeight
        })

        resizeObserver.observe(siteHeader[0])
    },
    beforeUnmount() {
        removeEventListener("hashchange", this.onLocationHashChanged)
    },
    computed: {
        ...mapState(usePiniaStore, ["editMode", "companyLogo"]),

        mainNavigation() {
            const navigationEntries = []
            const sections = this.site.main?.sections
            if(sections) {
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].showLinkInMainNavigation) {
                        const path = "#anchor-" + sections[i].id
                        const entry = {
                            iconClass: sections[i].iconClass,
                            text: sections[i].navEntry,
                            path: path,
                            type: "href",
                            active: this.currentUrlHash === path // compare url from hash with path from store to set 'active'-class
                        }
                        navigationEntries.push(entry)
                    }
                }
            }
            return navigationEntries
        },

        iconBackToTop() {
            return {
                iconClass: "icon-single-arrow-up",
                tooltip: this.label("back_to_top_button.tooltip")
            }
        },

        // create reference "currentLanguage" from store as computed property
        ...mapState(usePiniaStore, ["currentLanguage", "site"]),

        // addressData() {
        //    const addressDataTranslated = JSON.parse(JSON.stringify(this.addressDataData))
        //    addressDataTranslated.address.country = this.label(addressDataTranslated.address.country, addressDataTranslated.address.country)
        //     return addressDataTranslated
        // },

        openingHours() {
            const openingHoursTranslated = []

            for(let i = 0; i < this.openingHoursData.length; i++){
                // copy/spread one weekday of openingHoursData to variable
                const weekday = {...this.openingHoursData[i]}

                // assign label from BaseI18n (or the value set in json-file)
                weekday.day = this.label('opening_hours.' + weekday.day, weekday.day)

                openingHoursTranslated.push(weekday)
            }

            return openingHoursTranslated

        }
    },
    methods: {
        handlers(component) {
            if(component.handlers === "toggleSection") {
                return {
                    "click": this.toggleSection
                }
            }
            return {}
        },
        toggleSection(event) {
            console.log("event", event)
            if(event.link.sectionId) {
               event.originalEvent.preventDefault()
               const sectionToToggle = this.site.main?.sections.find(section => {
                    return section.id === event.link.sectionId
                })
                if(sectionToToggle) {
                    sectionToToggle.show = !sectionToToggle.show
                }
            }
        },
        // update data-property on url/hash-change to trigger update of mainNavigation-computed-property
        onLocationHashChanged() {
            this.currentUrlHash = location.hash
        },

        ...mapActions(usePiniaStore, ["loadLabels", "loadSite"]),

        openFancybox(event) {
            openFancyBox({url: event.target.href})
        },
        closeCookieDisclaimer() {
            this.fancyBoxCookieDisclaimer = false
            localStorage.setItem("onepagerPrivacySettingsAccepted", "true")
        }
    },
    watch: {
        currentLanguage: {
            handler() {
                // load site if language is changed (in store)
                this.loadSite()

                // load imported meta-data-function if language is changed (in store)
                loadMetaData(this.currentLanguage)

                // getItems-functions from listOfLinksClient (loads links async) and assign to data-property after data is received for top-header-navigation
                listOfLinksClient.getItems(this.currentLanguage, "top-header-navigation")
                .then(items => {
                    this.topHeaderNavigationData = items
                })
                .catch(e => console.error("Error loading top-header-navigation-data", e))

                // getItems-functions from listOfLinksClient (loads links async) and assign to data-property after data is received for footer-navigation
                listOfLinksClient.getItems(this.currentLanguage, "footer-navigation")
                .then(items => {
                    this.footerNavigationData = items
                })
                .catch(e => console.error("Error loading footer-navigation-data", e))
            },
            immediate: true
        }
    }
}
</script>
