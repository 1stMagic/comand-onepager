<template>
    <!-- begin inner-wrapper -->
    <div class="grid-main-item-inner-wrapper" id="inner-wrapper">
        <!-- begin content-wrapper -->
        <div id="content-wrapper"><!-- no row allowed -->
            <!-- begin content -->
            <main class="grid-item-main">
                <!-- begin cmd-slideshow -->
                <CmdSlideshow :slideshow-items="slideshowData" :full-width="true" :autoplay="true"/>
                <!-- begin cmd-slideshow -->

                <!-- begin main content -->
                <div class="grid-item-page-content" id="page-content">
                    <!-- begin cmd-width-limitations-wrapper -->
                    <CmdWidthLimitationWrapper id="main-headline">
                        <!-- begin cmd-headline -->
                        <CmdHeadline :headlineText="label('title')" :headlineLevel="1" />
                        <!-- end cmd-headline -->
                    </CmdWidthLimitationWrapper>
                    <!-- end cmd-width-limitations-wrapper -->

                    <ContentSection
                        v-for="section in sections"
                        :key="section.id"
                        :id="section.id"
                        :headline="section.headline"
                        :content="section.content"
                        :imgpath="section.imgPath"
                        :images="section.images"
                    />

                    <!-- begin cmd-width-limitations-wrapper -->
                    <CmdWidthLimitationWrapper anchor-id="anchor-section4">
                        <ContactForm form-action="#"/>
                    </CmdWidthLimitationWrapper>
                    <!-- end cmd-width-limitations-wrapper -->

                    <!-- begin cmd-width-limitations-wrapper -->
                    <CmdWidthLimitationWrapper>
                        <!-- begin cmd-share-buttons -->
                        <CmdShareButtons :shareButtons="shareButtons" />
                        <!-- begin cmd-share-buttons -->
                    </CmdWidthLimitationWrapper>
                    <!-- end cmd-width-limitations-wrapper -->
                </div>
                <!-- end main content -->
            </main>
            <!-- content end -->
        </div>
        <!-- end content-wrapper end -->
    </div>
    <!-- end inner-wrapper -->
</template>

<script>
// import components from comand-component-library
import { CmdHeadline } from 'comand-component-library'
import { CmdShareButtons } from 'comand-component-library'
import { CmdSlideshow } from 'comand-component-library'
import { CmdWidthLimitationWrapper } from 'comand-component-library'

// import components from comand-onepager
import ContentSection from './ContentSection.vue'
import ContactForm from './ContactForm.vue'
import {imageSliderClient} from "../api/SlideshowClient"

// import used data
import shareButtons from '../assets/data/share-buttons.json'
import BaseI18nComponent from "./mixins/BaseI18nComponent"

import {mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"

export default {
    data() {
        return {
            slideshowData: [],
            shareButtons: shareButtons
        }
    },
    mixins: [BaseI18nComponent],
    components: {
        CmdHeadline,
        CmdShareButtons,
        CmdSlideshow,
        CmdWidthLimitationWrapper,
        ContentSection,
        ContactForm
    },
    created() {
        console.log("created")
    },
    mounted() {
        console.log("mounted")
        this.languageChanged()
    },
    computed: {
        ...mapState(usePiniaStore, ["sections"])
    },
    methods: {
        languageChanged() {
            imageSliderClient.getItems("de")
                .then(items => {
                    this.slideshowData = items
                })
                .catch(e => console.error('Error loading slideshow images', e))
        }
    }
}

    // @Watch('$store.state.currentLanguage', {immediate: true})
    // private languageChanged(): void {
    //     imageSliderClient.getItems(this.$store.state.currentLanguage)
    //         .then(items => this.slideshowData = items)
    //         .catch(e => console.error('Error loading slideshow images', e));
    // }

</script>
