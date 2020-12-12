<template>
    <div :class="['grid-main-item-header-wrapper', 'sticky', {'top-header-navigation': topHeaderNavigationData}]" id="header-wrapper">
        <CmdTopHeaderNavigation :topHeaderNavigationData="topHeaderNavigationData" v-if="topHeaderNavigationData" />
        <header class="grid-container-create-columns">
            <CmdLogo tooltip="To homepage" altText="Company logo" :pathLogo="require('@/assets/images/logo.svg')" />
            <CmdMainNavigation :navigationEntries="navigationData"
                            :closeOffcanvas="{'text': 'Close navigation', 'iconClass': 'icon-cancel'}" />
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CmdLogo} from 'comand-ui-kit'
    import {CmdTopHeaderNavigation} from 'comand-ui-kit'
    import {CmdMainNavigation} from 'comand-ui-kit'

    import topHeaderNavigationData from '@/assets/data/top-header-navigation-data.json';
    import navigationData from "@/assets/data/navigation-data.json";

    @Component({
        components: {
            CmdLogo,
            CmdMainNavigation,
            CmdTopHeaderNavigation
        },
        props: {
            navigationData: {
                type: Array,
                required: false
            }
        }
    })
    export default class SiteHeader extends Vue {
        data() {
            return {
                navigationData,
                topHeaderNavigationData
            }
        }
    }
</script>

<style lang="scss">
#header-wrapper {
    z-index: 100;
    border-bottom: var(--default-border);
    background: var(--pure-white);

    &.grid-main-item-header-wrapper {
        grid-area: header-wrapper;
    }

    &.sticky {
        position: sticky;
        left: 0;
        right: 0;
        top: 0;
        padding: calc(var(--default-padding) * 2) 0;
    }

    &.top-header-navigation {
        padding-top: 0;
    }

    header {
        nav {
            padding: 0;
        }

        #main-navigation, nav ul li, #navigation-wrapper {
            background: none;
        }

        #navigation-wrapper {
            align-self: center;
        }
    }
}
</style>
