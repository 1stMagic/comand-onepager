<template>
    <!-- begin content -->
    <main>
        <!-- begin cmd-slideshow -->
        <CmdSlideshow
            :slideshow-items="slideshowData"
            :full-width="true"
            :autoplay="true"
            :cmdSlideButtons="cmdSlideButtons"
        />
        <!-- end cmd-slideshow -->

        <!-- begin main content -->
        <div id="page-content">
            <!-- begin cmd-width-limitations-wrapper -->
            <CmdWidthLimitationWrapper id="main-headline">
                <!-- begin cmd-headline -->
                <CmdHeadline :headlineText="label('headline.title')" :headlineLevel="1"/>
                <!-- end cmd-headline -->
            </CmdWidthLimitationWrapper>
            <!-- end cmd-width-limitations-wrapper -->

            <!-- begin content sections -->
            <ContentSection
                v-for="section in sections"
                :key="section.id"
                :id="section.id"
                :headline="section.headline"
                :content="section.content"
                :imgpath="section.imgPath"
                :images="section.images"
            />
            <!-- end content sections -->

            <!-- begin cmd-width-limitations-wrapper -->
            <CmdWidthLimitationWrapper anchor-id="anchor-section4">
                <ContactForm form-action="#"/>
            </CmdWidthLimitationWrapper>
            <!-- end cmd-width-limitations-wrapper -->

            <!-- begin cmd-width-limitations-wrapper -->
            <CmdWidthLimitationWrapper>
                <!-- begin cmd-share-buttons -->
                <CmdShareButtons :shareButtons="shareButtons" :appendPage="true"/>
                <!-- end cmd-share-buttons -->
            </CmdWidthLimitationWrapper>
            <!-- end cmd-width-limitations-wrapper -->
        </div>
        <!-- end main content -->
    </main>
    <!-- end content -->
</template>

<script>
// import components from comand-component-library
import {CmdHeadline} from 'comand-component-library'
import {CmdShareButtons} from 'comand-component-library'
import {CmdSlideshow} from 'comand-component-library'
import {CmdWidthLimitationWrapper} from 'comand-component-library'

// import components from comand-onepager
import ContentSection from './ContentSection.vue'
import ContactForm from './ContactForm.vue'
import {imageSliderClient} from "../api/SlideshowClient"

// import used data
import BaseI18nComponent from "./mixins/BaseI18nComponent"

import {mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"
import {shareButtonsClient} from "../api/ShareButtonsClient"

export default {
    data() {
        return {
            slideshowData: [],
            shareButtons: [],
        }
    },
    mixins: [
        BaseI18nComponent
    ],
    components: {
        CmdHeadline,
        CmdShareButtons,
        CmdSlideshow,
        CmdWidthLimitationWrapper,
        ContentSection,
        ContactForm
    },
    computed: {
        ...mapState(usePiniaStore, ["sections", "currentLanguage"]),

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
