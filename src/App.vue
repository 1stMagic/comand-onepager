<template>
    <!-- begin page-wrapper -->
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin outer-wrapper -->
        <div class="grid-main-container" id="outer-wrapper">
            <CmdSiteHeader :cmd-main-navigation="{navigationEntries: mainNavigationData}">
                <template v-slot:top-header>
                    <CmdListOfLinks
                        v-if="topHeaderNavigationData"
                        :links="topHeaderNavigationData"
                        orientation="horizontal"
                        align="right"
                    />
                </template>
                <template v-slot:logo>
                    <CmdCompanyLogo
                        link="/"
                        altText="CoManD Logo"
                        :pathDefaultLogo="defaultLogo"
                        :pathDarkmodeLogo="darkmodeLogo"
                    />
                </template>
            </CmdSiteHeader>
            <InnerWrapper />
            <CmdSiteFooter>
                <cmd-switch-language :languages="languagesData" @click="changeLanguage" />
                <CmdListOfLinks :links="footerNavigationData" headline="Links" />
                <cmd-opening-hours :openingHours="openingHoursData" headline="Opening hours" textOpenClosed="Momentan geschlossen!" textHolidaysClosed="Feiertags geschlossen" textMiscInfo="Sonstige Angaben kommen hierhin" />
                <cmd-address-data :addressData="addressData" headline="Contact" />
            </CmdSiteFooter>
            <!-- begin copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation />
            <!-- end copyright-information DO NOT REMOVE -->
            <CmdBackToTopButton href="#anchor-back-to-top" iconClass="icon-single-arrow-up" tooltip="Back to top" />
        </div>
        <!-- end outer-wrapper -->
        <CmdCookieDisclaimer
            headline="Datenschutzeinstellungen"
            buttonLabelAcceptAllCookies=""
            buttonLabelAcceptCurrentSettings="Akzeptieren"
            @currentSettings="saveCurrentSettings"
            :cookieOptions="{}"
            v-if="!onepagerPrivacySettingsAccepted">
            <template #privacy-text>
                <p>
                    <strong>
                        Durch die Nutzung der Website stimmen Sie der Verwendung und Speicherung anonymisierter Daten zu! <br />
                        Für mehr Details lesen Sie bitte die <a href="/content/data-privacy-de.html" @click.prevent="openFancybox">Datenschutzerklärung</a>.
                    </strong>
                </p>
            </template>
        </CmdCookieDisclaimer>
    </div>
    <!-- end page-wrapper -->
</template>

<script>
/* import components from comand-component-library */
import {CmdAddressData} from 'comand-component-library'
import {CmdBackToTopButton} from 'comand-component-library'
import {CmdCookieDisclaimer} from 'comand-component-library'
import {CmdCopyrightInformation} from 'comand-component-library'
import {CmdFancyBox} from 'comand-component-library'
import {CmdCompanyLogo} from 'comand-component-library'
import {CmdOpeningHours} from 'comand-component-library'
import {CmdSiteHeader} from 'comand-component-library'
import {CmdSiteFooter} from 'comand-component-library'
import {CmdSwitchLanguage} from 'comand-component-library'
import {CmdListOfLinks} from 'comand-component-library'
import {CmdWidthLimitationWrapper} from 'comand-component-library'
import { openFancyBox } from 'comand-component-library'

// import components from onepager
import InnerWrapper from './components/InnerWrapper.vue'

/* import used data */
import languagesData from './assets/data/languages.json'
import footerNavigationData from './assets/data/footer-navigation.json'
import addressData from './assets/data/address.json'
import openingHoursData from './assets/data/opening-hours.json'
import topHeaderNavigationData from './assets/data/top-header-navigation.json'
import mainNavigationData from './assets/data/main-navigation.json'

// import graphics
import defaultLogo from "comand-component-library/src/assets/images/logo.svg"
import darkmodeLogo from "comand-component-library/src/assets/images/logo-darkmode.svg"

export default {
    components: {
        CmdListOfLinks,
        CmdBackToTopButton,
        CmdCookieDisclaimer,
        CmdCopyrightInformation,
        CmdFancyBox,
        CmdCompanyLogo,
        CmdWidthLimitationWrapper,
        InnerWrapper,
        CmdSiteHeader,
        CmdSwitchLanguage,
        CmdSiteFooter,
        CmdOpeningHours,
        CmdAddressData
    },
    data() {
        return {
            sf: false,
            onepagerPrivacySettingsAccepted: false,
            defaultLogo,
            darkmodeLogo,
            languagesData,
            footerNavigationData,
            openingHoursData,
            addressData,
            topHeaderNavigationData,
            mainNavigationData
        }
    },
    created() {
        //this.$store.dispatch('loadLabels');
        //this.$store.dispatch('loadSections');
        this.onepagerPrivacySettingsAccepted = localStorage.getItem('onepagerPrivacySettingsAccepted') === "true";
    },
    methods: {
        changeLanguage() {
            // this.$store.dispatch("loadSections"); // load action from store
        },
        openFancybox (event) {
            openFancyBox({url: event.target.href})
        },
        saveCurrentSettings () {
            localStorage.setItem("onepagerPrivacySettingsAccepted", "true");
        }
    }
}
</script>