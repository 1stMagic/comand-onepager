<template>
    <!-- begin switch language -->
    <div class="grid-item-language-support">
        <router-link v-for="language in languages"
                     :to="{name: 'home', params: {lang: language}}"
                     :key="language" active-class="active"
                     class="flag"
                     @click.native="changeLanguage">
                    <img :src="getFlagURL(language)" :alt="language" :title="language" />
        </router-link>
    </div>
    <!-- end switch language -->
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseI18nComponent from '@/components/base/BaseI18nComponent';

    @Component
    export default class SwitchLanguage extends BaseI18nComponent {
        changeLanguage() {
            this.$store.dispatch("loadSections"); // load action from store
        }

        getFlagURL(isoCode) {
            return require("../assets/images/flags/flag-" + isoCode + ".svg")
        }
    }
</script>

<style lang="scss">
.grid-item-language-support {
    display: flex;

    .flag {
        &.active {
            box-shadow: var(--box-shadow); /* box-shadow (left/right, top/bottom, blur, color) for active language-flag-icon */
        }
    }
}
</style>