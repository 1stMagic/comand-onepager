<template>
    <!-- begin page-wrapper -->
    <div :id="templateId">
        <div :class="{'edit-mode': editMode, 'overflow-hidden': offCanvasOpen}" id="page-wrapper"
             :style="{'scroll-padding-top': heightSiteHeader + 'px'}">
            <div v-if="editMode" class="system-message info" id="edit-mode-message">
                <div class="flex-container">
                    <div>
                    <p>You are in EditMode. You can simply edit components by clicking on them and selecting one of the
                        actions-buttons at the top-right corner of that component.</p>
                    <p><a href="#" @click.prevent="leaveEditMode">Leave EditMode</a></p>
                    </div>
                        <div>

                        <label for="select-template">
                            <span class="hidden">Select template</span>
                            <select id="select-template" v-model="selectedTemplate">
                                <option value="blank">Blank</option>
                                <option value="business">Business</option>
                                <option value="casual">Casual</option>
                                <option value="dating">Dating</option>
                                <option value="influencer">Influencer</option>
                            </select>
                        </label>
                    </div>

                </div>
            </div>
      <EditModeComponentSettingsWrapper v-if="editMode && showEditModeComponentSettings" />
            <a id="anchor-back-to-top"></a>
            <!-- begin cmd-site-header -->
            <CmdSiteHeader
                    :cmd-main-navigation="{navigationEntries: mainNavigation}"
                    :closeOffcanvas="{ iconClass: 'icon-cancel', text: label('main_navigation.close_navigation'), showText: true}"
                    :navigationInline="site.siteHeader?.navigationInline"
                    @offcanvas="offcanvasToggled"
            >
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
                            :editContent="childComponent.editContent"/>
                </component>
            </CmdSiteFooter>
            <!-- end cmd-site-footer -->

            <!-- begin cmd-copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation/>
            <!-- end cmd-copyright-information DO NOT REMOVE -->

            <!-- begin cmd-back-to-top-button -->
            <CmdBackToTopButton href="#anchor-back-to-top" :iconBackToTop="iconBackToTop"
                                scroll-container="#page-wrapper"/>
            <!-- end cmd-back-to-top-button -->

            <!-- begin fancy-box ------------------------------------------------------------------------------------------------------------------------------------------------------->
            <CmdFancyBox
                    v-if="cookieDisclaimerData"
                    :show="fancyBoxCookieDisclaimer"
                    :fancyboxOptions="{}"
                    :allowEscapeKey="false"
                    :cmdHeadline="{show: true, headlineText: 'Cookie Disclaimer', headlineLevel: 2}"
                    ariaLabelText="Cookie Disclaimer"
            >
                <!-- begin cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->
                <CmdCookieDisclaimer
                        :cookieOptions="cookieDisclaimerData"
                        buttonLabelAcceptAllCookies="Accept all cookies"
                        buttonLabelAcceptCurrentSettings="Accept current settings"
                        @closeCookieDisclaimer="closeCookieDisclaimer"
                        v-model="acceptedCookies"
                        :cmdHeadlineCookieDisclaimer="{ show: false }">
                    <template #privacy-text>
                        <p>
                            <strong>
                                By browsing this web site you accept the usage and saving of anonymous data!
                            </strong>
                        </p>
                    </template>
                </CmdCookieDisclaimer>
                <!-- end cookie-disclaimer ------------------------------------------------------------------------------------------------------------------------------------------------------->
            </CmdFancyBox>
            <!-- end fancy-box ------------------------------------------------------------------------------------------------------------------------------------------------------->
        </div>
        <!-- end page-wrapper -->
    </div><!-- end templateId -->
</template>

<script>
// import components from comand-component-library
import {openFancyBox} from 'comand-component-library'

// import functions
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"
import {loadMetaData} from "../utils/metaData"

// import mixins
import BaseI18nComponent from "../components/mixins/BaseI18nComponent"

export default {
    mixins: [
        BaseI18nComponent
    ],
    props: {
        cookieDisclaimerData: {
            type: Object
        }
    },
    data() {
        return {
            selectedTemplate: "blank",
            acceptedCookies: [],
            fancyBoxCookieDisclaimer: true,
            footerNavigationData: [],
            topHeaderNavigationData: [],
            currentUrlHash: location.hash,
            heightSiteHeader: 150,
            offCanvasOpen: false
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
        templateId() {
            return "template-" + this.selectedTemplate
        },
        ...mapState(usePiniaStore, ["editMode", "componentEditMode", "showEditModeComponentSettings", "companyLogo"]),

        mainNavigation() {
            const navigationEntries = []
            const sections = this.site.main?.sections
            if (sections) {
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

            for (let i = 0; i < this.openingHoursData.length; i++) {
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
            if (component.handlers === "toggleSection") {
                return {
                    "click": this.toggleSection
                }
            }
            return {}
        },
        toggleSection(event) {
            console.log("event", event)
            if (event.link.sectionId) {
                event.originalEvent.preventDefault()
                const sectionToToggle = this.site.main?.sections.find(section => {
                    return section.id === event.link.sectionId
                })
                if (sectionToToggle) {
                    sectionToToggle.show = !sectionToToggle.show
                }
            }
        },
        // update data-property on url/hash-change to trigger update of mainNavigation-computed-property
        onLocationHashChanged() {
            this.currentUrlHash = location.hash
        },

        ...mapActions(usePiniaStore, ["loadLabels", "loadSite", "deactivateEditMode"]),

        openFancybox(event) {
            openFancyBox({url: event.target.href})
        },
        closeCookieDisclaimer() {
            this.fancyBoxCookieDisclaimer = false
            localStorage.setItem("onepagerPrivacySettingsAccepted", "true")
        },
        offcanvasToggled(event) {
            this.offCanvasOpen = event.open
        },
        leaveEditMode() {
            if (confirm('Really leave EditMode? (All unsaved changes will be lost!)')) {
                this.deactivateEditMode()
            }
        }
    },
    watch: {
        currentLanguage: {
            handler() {
                // load site if language is changed (in store)
                this.loadSite()

                // load imported meta-data-function if language is changed (in store)
                loadMetaData(this.currentLanguage)
            },
            immediate: true
        },
        selectedTemplate() {
            let linkTag = document.querySelector('link')

            if (linkTag) {
                linkTag.parentNode.removeChild(linkTag)
            }

            if (this.selectedTemplate !== "blank") {
                let newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = 'https://cdn.jsdelivr.net/npm/comand-frontend-framework/dist/templates/' + this.selectedTemplate + '.css';

                document.head.appendChild(newLink);
            }
        }
    }
}
</script>

<style lang="scss">
.edit-mode {
    #edit-mode-message {
        position: fixed;
        z-index: 1000;
        width: 100%;
        text-align: center;
        margin: 0;

        > * {
            margin: 0 auto;
        }

        select {
            color: var(--text-color);
        }
    }


    .edit-mode-component-settings-wrapper {
        background: var(--default-background);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 2000;
        padding: var(--default-padding);
        height: 100vh;
    }
}
</style>
