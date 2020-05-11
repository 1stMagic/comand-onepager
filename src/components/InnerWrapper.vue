<template>
    <!-- begin inner_wrapper -->
    <div class="grid-main-item_inner-wrapper" id="inner_wrapper">
        <!-- begin content_wrapper -->
        <div id="content_wrapper"><!-- no row allowed -->
            <!-- begin content -->
            <main class="grid-item_main">
                <slideshow-wrapper v-bind:full-width="true" v-bind:autoplay="true" />
                <!-- begin main content -->
                <div class="grid-item_page-content" id="page_content">
                    <main-headline />
                    <content-section v-for="section in $store.state.sections"
                        v-bind:key="section.id"
                        v-bind:id="section.id"
                        v-bind:headline="section.headline"
                        v-bind:content="section.content"
                        v-bind:imgpath="section.imgPath"
                        v-bind:images="section.images" />

                        <contact-form form-action="#" />
                </div>
                <!-- end main content -->
            </main>
            <!-- content end -->
        </div>
        <!-- end content_wrapper end -->
    </div>
    <!-- end inner_wrapper -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
/* import used components */
import SlideshowWrapper from '@/components/SlideshowWrapper.vue';
import MainHeadline from '@/components/MainHeadline.vue';
import ContentSection from '@/components/ContentSection.vue';
import ContactForm from '@/components/ContactForm.vue';

@Component ({
    components: {
    SlideshowWrapper,
    MainHeadline,
    ContentSection,
    ContactForm
    }
})
export default class InnerWrapper extends Vue {
}
</script>