<template>
    <!-- begin page-wrapper -->
    <div id="page-wrapper">
        <a id="anchor-back-to-top"></a>
        <!-- begin outer-wrapper -->
        <div class="grid-main-container" id="outer-wrapper">
            <SiteHeader :navigationData="navigationData" />
            <InnerWrapper />
            <SiteFooter />
            <!-- begin copyright-information DO NOT REMOVE -->
            <CmdCopyrightInformation />
            <!-- end copyright-information DO NOT REMOVE -->
            <CmdBackToTopButton href="#anchor-back-to-top" iconClass="icon-arrow-up" tooltip="Back to top" />
        </div>
        <!-- end outer-wrapper -->
    </div>
    <!-- end page-wrapper -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SiteHeader from '@/components/SiteHeader.vue';
    import InnerWrapper from '@/components/InnerWrapper.vue';
    import SiteFooter from '@/components/SiteFooter.vue';
    import {CmdCopyrightInformation} from 'comand-ui-kit'
    import {CmdFancyBox} from 'comand-ui-kit'
    import {CmdBackToTopButton} from 'comand-ui-kit'

    import navigationData from '@/assets/data/navigation-data.json';

    @Component({
        components: {
            SiteHeader,
            InnerWrapper,
            SiteFooter,
            CmdCopyrightInformation,
            CmdFancyBox,
            CmdBackToTopButton
        },
        data() {
            return {
                navigationData
            }
        }
    })

    export default class App extends Vue {
        private sf = false

        created(): void {
            this.$store.dispatch('loadLabels');
            this.$store.dispatch('loadSections');
        }
    }
</script>