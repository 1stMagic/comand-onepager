<template>
    <!-- begin page-wrapper -->
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin outer-wrapper -->
        <div class="grid-main-container" id="outer-wrapper">
            <SiteHeader :navigationData="navigationData" />
            <InnerWrapper />
            <CmdWidthLimitationWrapper class="grid-main-item-footer-wrapper" id="site-footer" inner-class="grid-container-create-columns">
                <SiteFooter />
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
    import {CmdBackToTopButton} from 'comand-component-library'
    import {CmdCookieDisclaimer} from 'comand-component-library'
    import {CmdCopyrightInformation} from 'comand-component-library'
    import {CmdFancyBox} from 'comand-component-library'
    import {CmdWidthLimitationWrapper} from 'comand-component-library'
    import { openFancyBox } from 'comand-component-library'

    import InnerWrapper from '@/components/InnerWrapper.vue'
    import SiteHeader from '@/components/SiteHeader.vue'
    import SiteFooter from '@/components/SiteFooter.vue'

    /* import used data */
    import navigationData from '@/assets/data/navigation-data.json'

    @Component({
        components: {
            CmdBackToTopButton,
            CmdCookieDisclaimer,
            CmdCopyrightInformation,
            CmdFancyBox,
            CmdWidthLimitationWrapper,
            InnerWrapper,
            SiteHeader,
            SiteFooter
        }
    })

    export default class App extends Vue {
        private sf = false
        private navigationData = navigationData
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