<template>
    <!-- begin inner-wrapper -->
    <div class="grid-main-item-inner-wrapper" id="inner-wrapper">
        <!-- begin content-wrapper -->
        <div id="content-wrapper"><!-- no row allowed -->
            <!-- begin content -->
            <main class="grid-item-main">
                <CmdSlideshow :slideshow-items="slideshowData" :full-width="true" :autoplay="true"/>
                <!-- begin main content -->
                <div class="grid-item-page-content" id="page-content">
                    <CmdWidthLimitationWrapper id="main-headline">
                        <h1>{{ label('title') }}</h1>
                    </CmdWidthLimitationWrapper>
                    <ContentSection v-for="section in []"
                                    :key="section.id"
                                    :id="section.id"
                                    :headline="section.headline"
                                    :content="section.content"
                                    :imgpath="section.imgPath"
                                    :images="section.images"/>
                    <CmdWidthLimitationWrapper anchor-id="anchor-section4">
                        <ContactForm form-action="#"/>
                    </CmdWidthLimitationWrapper>
                    <CmdWidthLimitationWrapper>
                        <CmdShareButtons :shareButtons="shareButtons" />
                    </CmdWidthLimitationWrapper>
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
/* import used components */
import { CmdShareButtons } from 'comand-component-library'
import { CmdSlideshow } from 'comand-component-library'
import { CmdWidthLimitationWrapper } from 'comand-component-library'
import ContentSection from './ContentSection.vue'
import ContactForm from './ContactForm.vue'
import {imageSliderClient} from "../api/SlideshowClient"

/* import used data */
import shareButtons from '../assets/data/share-buttons.json'
import BaseI18nComponent from "./mixins/BaseI18nComponent"

export default {
    data() {
        return {
            slideshowData: [],
            shareButtons: shareButtons
        }
    },
    mixins: [BaseI18nComponent],
    components: {
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
    methods: {
        languageChanged() {
            imageSliderClient.getItems("de")
                .then(items => {
                    this.slideshowData = items
                    console.log("items", this.slideshowData)
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
