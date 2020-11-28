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
                    <MainHeadline />
                    <ContentSection v-for="section in $store.state.sections"
                                     :key="section.id"
                                     :id="section.id"
                                     :headline="section.headline"
                                     :content="section.content"
                                     :imgpath="section.imgPath"
                                     :images="section.images"/>
                    <ContactForm form-action="#"/>
                </div>
                <!-- end main content -->
            </main>
            <!-- content end -->
        </div>
        <!-- end content-wrapper end -->
    </div>
    <!-- end inner-wrapper -->
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    /* import used components */
    import { CmdSlideshow } from 'comand-ui-kit'
    import MainHeadline from '@/components/MainHeadline.vue';
    import ContentSection from '@/components/ContentSection.vue';
    import ContactForm from '@/components/ContactForm.vue';
    import {imageSliderClient} from "@/api/SlideshowClient";
    import {SlideshowItem} from "@/types";

    @Component({
        components: {
            CmdSlideshow,
            MainHeadline,
            ContentSection,
            ContactForm
        }
    })
    export default class InnerWrapper extends Vue {

        private slideshowData: SlideshowItem[] = [];

        @Watch('$store.state.currentLanguage', {immediate: true})
        private languageChanged(): void {
            imageSliderClient.getItems(this.$store.state.currentLanguage)
                .then(items => this.slideshowData = items)
                .catch(e => console.error('Error loading slideshow images', e));
        }
    }
</script>
