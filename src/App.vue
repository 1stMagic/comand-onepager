<template>
    <!-- begin page_wrapper -->
    <div id="page_wrapper">
        <a id="anchor_back_to_top_wrapper"></a>
        <!-- begin outer_wrapper -->
        <div class="grid-main-container" id="outer_wrapper">
            <header-wrapper/>
            <inner-wrapper/>
            <footer-wrapper/>
            <!-- begin copyright DO NOT REMOVE -->
            <div class="grid-main-item_copyright-wrapper">
                <a href="http://www.comand-cms.com" target="_blank" lang="en" title="CoManD-Website">&copy;
                    CoManD-OnePager</a>
            </div>
            <!-- end copyright -->
            <back-to-top/>
        </div>
        <!-- end outer_wrapper -->
        <fancy-box/>
    </div>
    <!-- end page_wrapper -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HeaderWrapper from '@/components/HeaderWrapper.vue'; /* @ == root */
    import InnerWrapper from '@/components/InnerWrapper.vue';
    import FooterWrapper from '@/components/FooterWrapper.vue';
    import FancyBox from '@/components/FancyBox.vue';
    import BackToTop from '@/components/BackToTop.vue';

    @Component({
        components: {
            HeaderWrapper,
            InnerWrapper,
            FooterWrapper,
            FancyBox,
            BackToTop
        }
    })
    export default class App extends Vue {
        created(): void {
            this.$store.dispatch('loadLabels');
            this.$store.dispatch('loadSections');
        }
    }

</script>
