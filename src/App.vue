<template>
    <!-- begin page-wrapper -->
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin outer-wrapper -->
        <div class="grid-main-container" id="outer-wrapper">
            <CmdWidthLimitationWrapper inner-component="header" :sticky="true" :class="{'top-header-navigation' : topHeaderNavigationData}">
                <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData" />
                <CmdLogo altText="CoManD Logo" :pathDefaultLogo="require('@/assets/images/logo.svg')" :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"  />
            </CmdWidthLimitationWrapper>
            <InnerWrapper />
            <CmdWidthLimitationWrapper class="grid-main-item-footer-wrapper" id="site-footer" inner-component="footer">
                <cmd-switch-language :languages="languagesData" @click="changeLanguage" />
                <cmd-footer-navigation :footerNavigation="footerNavigationData" headline="Links" />
                <cmd-opening-hours :openingHours="openingHoursData" headline="Opening hours" textOpenClosed="Momentan geschlossen!" textHolidaysClosed="Feiertags geschlossen" textMiscInfo="Sonstige Angaben kommen hierhin" />
                <cmd-address-data :addressData="addressData" headline="Contact" />
            </CmdWidthLimitationWrapper>
            <!-- begin copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation />
            <!-- end copyright-information DO NOT REMOVE -->
            <CmdBackToTopButton href="#anchor-back-to-top" iconClass="icon-single-arrow-up" tooltip="Back to top" />
        </div>
        <!-- end outer-wrapper -->
        <CmdCookieDisclaimer headline="Datenschutzeinstellungen" buttonLabelAcceptAllCookies="" buttonLabelAcceptCurrentSettings="Akzeptieren" @currentSettings="saveCurrentSettings" v-if="!onepagerPrivacySettingsAccepted">
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

<script lang="ts">
    /* import used components */
    import {Component, Vue} from 'vue-property-decorator'


    import {CmdAddressData} from 'comand-component-library'
    import {CmdBackToTopButton} from 'comand-component-library'
    import {CmdCookieDisclaimer} from 'comand-component-library'
    import {CmdCopyrightInformation} from 'comand-component-library'
    import {CmdFancyBox} from 'comand-component-library'
    import {CmdFooterNavigation} from 'comand-component-library'
    import {CmdCompanyLogo} from 'comand-component-library'
    import {CmdOpeningHours} from 'comand-component-library'
    import {CmdSwitchLanguage} from 'comand-component-library'
    import {CmdTopHeaderNavigation} from 'comand-component-library'
    import {CmdWidthLimitationWrapper} from 'comand-component-library'
    import { openFancyBox } from 'comand-component-library'



    import InnerWrapper from '@/components/InnerWrapper.vue'
    import SiteHeader from '@/components/SiteHeader.vue'

    /* import used data */
    import languagesData from '@/assets/data/languages.json';
    import footerNavigationData from '@/assets/data/footer-navigation.json';
    import addressData from '@/assets/data/address.json';
    import openingHoursData from '@/assets/data/opening-hours.json';
    import topHeaderNavigationData from '@/assets/data/top-header-navigation.json'
    import mainNavigationData from '@/assets/data/main-navigation.json'

    @Component({
        components: {
            CmdTopHeaderNavigation,
            CmdBackToTopButton,
            CmdCookieDisclaimer,
            CmdCopyrightInformation,
            CmdFancyBox,
            CmdCompanyLogo,
            CmdWidthLimitationWrapper,
            InnerWrapper,
            SiteHeader,
            CmdSwitchLanguage,
            CmdFooterNavigation,
            CmdOpeningHours,
            CmdAddressData
        },
        data () {
            return {
                languagesData,
                footerNavigationData,
                openingHoursData,
                addressData,
                topHeaderNavigationData,
                mainNavigationData
            }
        },
        methods: {
            changeLanguage() {
                this.$store.dispatch("loadSections"); // load action from store
            }
        }
    })

    export default class App extends Vue {
        private sf = false
        private mainNavigationData = mainNavigationData
        private onepagerPrivacySettingsAccepted = false

        created(): void {
           this.$store.dispatch('loadLabels');
           this.$store.dispatch('loadSections');
           this.onepagerPrivacySettingsAccepted = localStorage.getItem('onepagerPrivacySettingsAccepted') === "true";
        }

        private openFancybox (event) {
            openFancyBox({url: event.target.href})
        }

        private saveCurrentSettings () {
            localStorage.setItem("onepagerPrivacySettingsAccepted", "true");
        }
    }
</script>