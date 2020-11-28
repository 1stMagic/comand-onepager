<template>
    <div class="grid-main-item-header-wrapper sticky" id="header-wrapper">
        <header class="grid-container-create-columns">
            <Logo />
            <CmdMainNavigation :navigationEntries="navigationData"
                            :closeOffcanvas="{'text': 'Close navigation', 'iconClass': 'icon-cancel'}" />
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Logo from '@/components/Logo.vue'
    import {CmdMainNavigation} from 'comand-ui-kit'

    @Component({
        components: {
            Logo,
            CmdMainNavigation
        },
        props: {
            navigationData: {
                type: Array,
                required: false
            }
        }
    })
    export default class SiteHeader extends Vue {

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
