<template>
    <div :class="['width-limitation-wrapper', 'grid-main-item-header-wrapper', 'sticky', {'top-header-navigation': topHeaderNavigationData}]" id="site-header">
        <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData" />
        <header class="grid-container-create-columns">
            <CmdLogo tooltip="To homepage" altText="Company logo" :pathLogo="require('@/assets/images/logo.svg')" />
            <CmdMainNavigation :navigationEntries="navigationData" :closeOffcanvas="{'text': 'Close navigation', 'iconClass': 'icon-cancel'}" />
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {CmdLogo} from 'comand-component-library'
    import {CmdTopHeaderNavigation} from 'comand-component-library'
    import {CmdMainNavigation} from 'comand-component-library'

    import topHeaderNavigationData from '@/assets/data/top-header-navigation-data.json';

    @Component({
        components: {
            CmdLogo,
            CmdMainNavigation,
            CmdTopHeaderNavigation
        }
    })
    export default class SiteHeader extends Vue {
        @Prop() private navigationData
        private topHeaderNavigationData = topHeaderNavigationData
    }
</script>