<template>
    <!-- begin page-wrapper -->
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin outer-wrapper -->
        <div class="grid-main-container" id="outer-wrapper">
            <!-- begin cmd-site-header -->
            <CmdSiteHeader :cmd-main-navigation="{navigationEntries: mainNavigation}">
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
                        :link="{type: 'router', path: '/'}"
                        altText="CoManD Logo"
                        :pathDefaultLogo="defaultLogo"
                        :pathDarkmodeLogo="darkmodeLogo"
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
                <div class="flex-container">
                    <!-- begin cmd-switch-language -->
                    <CmdSwitchLanguage
                        :languages="languagesData"
                    />
                    <!-- end cmd-switch-language -->

                    <!-- begin cmd-toggle-dark-mode -->
                    <CmdToggleDarkMode
                        :showLabel="true"
                        :useStyledLayout="true"
                        :labelTextDarkMode="label('toggle_dark_mode.label_text.dark_mode_enabled')"
                        :labelTextLightMode="label('toggle_dark_mode.label_text.light_mode_enabled')"
                    />
                    <!-- end cmd-toggle-dark-mode -->
                </div>

                <!-- begin cmd-list-of-links (for footer-navigation) -->
                <CmdListOfLinks
                    :links="footerNavigationData"
                    :cmdHeadline="{headlineText: label('list_of_links-footer_navigation.headline'), headlineLevel: 6}"
                />
                <!-- end cmd-list-of-links (for footer-navigation) -->

                <!-- begin cmd-opening-hours -->
                <CmdOpeningHours
                    :openingHours="openingHours"
                    :cmdHeadline="{headlineText: label('opening_hours.headline'), headlineLevel: 6}"
                    :textOpenClosed="label('opening_hours.open_closed')"
                    :textHolidaysClosed="label('opening_hours.holidays_closed')"
                    :textMiscInfo="label('opening_hours.misc_info')"
                />
                <!-- end cmd-opening-hours -->

                <!-- begin cmd-address-data -->
                <CmdAddressData
                    :addressData="addressData"
                    :cmdHeadline="{headlineText: label('address_data.headline'), headlineLevel: 6}"
                    :i18n="labels"
                />
                <!-- end cmd-address-data -->
            </CmdSiteFooter>
            <!-- end cmd-site-footer -->

            <!-- begin cmd-copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation/>
            <!-- end cmd-copyright-information DO NOT REMOVE -->

            <!-- begin cmd-back-to-top-button -->
            <CmdBackToTopButton href="#anchor-back-to-top" :iconBackToTop="iconBackToTop"/>
            <!-- end cmd-back-to-top-button -->
        </div>
        <!-- end outer-wrapper -->

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
import {CmdAddressData} from 'comand-component-library'
import {CmdBackToTopButton} from 'comand-component-library'
import {CmdCompanyLogo} from 'comand-component-library'
import {CmdCookieDisclaimer} from 'comand-component-library'
import {CmdCopyrightInformation} from 'comand-component-library'
import {CmdFancyBox} from 'comand-component-library'
import {CmdListOfLinks} from 'comand-component-library'
import {CmdOpeningHours} from 'comand-component-library'
import {CmdSiteFooter} from 'comand-component-library'
import {CmdSiteHeader} from 'comand-component-library'
import {CmdSwitchLanguage} from 'comand-component-library'
import {CmdToggleDarkMode} from 'comand-component-library'
import {CmdWidthLimitationWrapper} from 'comand-component-library'
import {openFancyBox} from 'comand-component-library'

// import components from comand-onepager
import InnerWrapper from './components/InnerWrapper.vue'

// import used data
import addressDataData from './assets/data/address-data.json'
import cookieDisclaimerData from './assets/data/cookie-disclaimer.json'
import languagesData from './assets/data/languages.json'
import openingHoursData from './assets/data/opening-hours.json'

// import graphics
import defaultLogo from "comand-component-library/src/assets/images/logo.svg"
import darkmodeLogo from "comand-component-library/src/assets/images/logo-darkmode.svg"

// import functions
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "./stores/pinia"
import {loadMetaData} from "./utils/metaData"
import {listOfLinksClient} from "./api/ListOfLinksClient"

// import mixins
import BaseI18nComponent from "./components/mixins/BaseI18nComponent"

export default {
    components: {
        CmdAddressData,
        CmdBackToTopButton,
        CmdCompanyLogo,
        CmdCookieDisclaimer,
        CmdCopyrightInformation,
        CmdFancyBox,
        CmdListOfLinks,
        InnerWrapper,
        CmdOpeningHours,
        CmdSiteFooter,
        CmdSiteHeader,
        CmdSwitchLanguage,
        CmdToggleDarkMode,
        CmdWidthLimitationWrapper
    },
    mixins: [
        BaseI18nComponent
    ],
    data() {
        return {
            addressDataData,
            cookieDisclaimerData,
            defaultLogo,
            darkmodeLogo,
            fancyBoxCookieDisclaimer: true,
            footerNavigationData: [],
            languagesData,
            openingHoursData,
            topHeaderNavigationData: [],
            currentUrlHash: location.hash
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
    beforeUnmount() {
        removeEventListener("hashchange", this.onLocationHashChanged)
    },
    computed: {
        mainNavigation() {
            const navigationEntries = []
            for(let i = 0; i < this.sections.length; i++) {
                const path = "#anchor-" + this.sections[i].id
                const entry = {
                    iconClass: this.sections[i].iconClass,
                    text: this.sections[i].navEntry,
                    path: path,
                    type: "href",
                    active: this.currentUrlHash === path // compare url from hash with path from store to set 'active'-class
                }
                navigationEntries.push(entry)
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
        ...mapState(usePiniaStore, ["currentLanguage", "sections"]),

        addressData() {
           const addressDataTranslated = JSON.parse(JSON.stringify(this.addressDataData))
           addressDataTranslated.address.country = this.label(addressDataTranslated.address.country, addressDataTranslated.address.country)
            return addressDataTranslated
        },

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
        // update data-property on url/hash-change to trigger update of mainNavigation-computed-property
        onLocationHashChanged() {
            this.currentUrlHash = location.hash
        },

        ...mapActions(usePiniaStore, ["loadLabels", "loadSections"]),

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
                // load sections if language is changed (in store)
                this.loadSections()

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
