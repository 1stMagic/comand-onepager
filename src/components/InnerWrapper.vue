<template>
    <!-- begin content -->
    <main>
        <!-- begin cmd-slideshow -->
        <CmdSlideshow
            v-if="slideshow.slideshowItems?.length"
            :slideshow-items="slideshow.slideshowItems"
            :full-width="true"
            :autoplay="false"
            :cmdSlideButtons="cmdSlideButtons"
        />
        <!-- end cmd-slideshow -->

        <!-- begin main content -->
        <div id="page-content">
            <!-- begin cmd-width-limitations-wrapper -->
            <CmdWidthLimitationWrapper v-if="mainHeadline || editMode" id="main-headline">
                <EditContentWrapper
                    v-if="editMode"
                    @delete="deleteComponent('mainHeadline')"
                    @add="addComponent('mainHeadline')"
                    :componentExists="mainHeadline">
                    <CmdHeadline v-if="mainHeadline" :headlineText="label('headline.title')" :headlineLevel="1"/>
                </EditContentWrapper>

                <!-- begin cmd-headline -->
                <CmdHeadline v-else :headlineText="label('headline.title')" :headlineLevel="1"/>
                <!-- end cmd-headline -->
            </CmdWidthLimitationWrapper>
            <!-- end cmd-width-limitations-wrapper -->

            <CmdWidthLimitationWrapper v-if="editMode">
                <EditContentWrapper :componentExists="false" @add="addComponent('contentSection')"/>
            </CmdWidthLimitationWrapper>

            <template v-if="editMode">
                <EditContentWrapper
                    v-for="(section, index) in sections" :key="index" :id="section.id"
                    @delete="deleteComponent('contentSection')"
                    :sectionShowLinkInMainNavigation="section.showLinkInMainNavigation"
                    :sectionLinkIconClass="section.iconClass"
                    :sectionLinkText="section.navEntry"
                    :sectionId="section.id"
                >
                    <!-- begin content sections -->
                    <template v-slot="slotProps">
                        <ContentSection
                            :components="section.components"
                            :sectionId="section.id"
                            :headlineText="section.headline"
                            :editContent="slotProps.editContent"
                            :editModeEvents="slotProps.editModeEvents"
                        />
                    </template>
                    <!-- end content sections -->
                </EditContentWrapper>
            </template>

            <template v-else>
                <!-- begin content sections -->
                <ContentSection
                    v-for="(section, index) in site.main?.sections || []" :key="index"
                    :id="section.id"
                    :headlineText="section.headline"
                    :components="section.components"
                />
                <!-- end content sections -->
            </template>

            <!-- begin cmd-width-limitations-wrapper -->
<!--            <CmdWidthLimitationWrapper anchor-id="anchor-section4">-->
<!--                <ContactForm form-action="#"/>-->
<!--            </CmdWidthLimitationWrapper>-->
            <!-- end cmd-width-limitations-wrapper -->
        </div>
        <!-- end main content -->
    </main>
    <!-- end content -->
</template>

<script>
import {imageSliderClient} from "../api/SlideshowClient"

// import used data
import BaseI18nComponent from "./mixins/BaseI18nComponent"

import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"
import {shareButtonsClient} from "../api/ShareButtonsClient"

export default {
    data() {
        return {
            slideshowData: [],
            shareButtons: []
        }
    },
    mixins: [
        BaseI18nComponent
    ],
    methods: {
        deleteComponent(componentName, sectionId) {
            if (componentName === "mainHeadline") {
                this.updateMainHeadlineState(false)
            } else if (componentName === "contentSection") {
                this.deleteContentSection(sectionId)
            }
        },
        addComponent(componentName) {
            if (componentName === "mainHeadline") {
                this.updateMainHeadlineState(true)
            } else if (componentName === "contentSection") {
                this.addContentSection()
            }
        },
        ...mapActions(usePiniaStore, ["updateMainHeadlineState", "deleteContentSection", "addContentSection"])
    },
    computed: {
        ...mapState(usePiniaStore, ["site", "currentLanguage", "editMode", "mainHeadline", "slideshow"]),

        cmdSlideButtons() {
            return {
                next: {
                    iconClass: "icon-single-arrow-right",
                    tooltip: this.label("slidebutton_next.tooltip")
                },
                prev: {
                    iconClass: "icon-single-arrow-left",
                    tooltip: this.label("slidebutton_previous.tooltip")
                }
            }
        }
    },
    watch: {
        currentLanguage: {
            handler() {
                // getItems-functions from listOfLinksClient (loads links async) and assign to data-property after data is received
                shareButtonsClient.getItems(this.currentLanguage, "share-buttons")
                    .then(items => {
                        this.shareButtons = items
                    })
                    .catch(e => console.error("Error loading share-buttons-data", e))

                imageSliderClient.getItems(this.currentLanguage)
                    .then(items => {
                        this.slideshowData = items
                    })
                    .catch(e => console.error('Error loading slideshow images', e))
            },
            immediate: true
        }
    }
}
</script>
