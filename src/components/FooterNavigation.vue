<template>
    <div :class="'grid-item-' + widgetClass">
        <h4>{{ label('headline_links') }}</h4>
        <ul>
            <template v-for="(link, index) in getLinks">
                <li :key="index">
                    <a :href="link.href" :target="link.target" @click="executeLink(link, $event)">{{ label(link.name) }}</a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {FooterNavigationLinks, FooterNavigationLink} from '@/types';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";
    import footerNavigation from '@/assets/data/footer-navigation.json';
    import { openFancyBox } from 'comand-ui-kit'

    @Component
    export default class FooterNavigation extends BaseI18nComponent {
        /* initialize class variables to use inside template above */
        links: FooterNavigationLinks = {};
        widgetClass = "";

        /* assign values from json file to class variables */
        created(): void {
            this.links = footerNavigation.links;
            this.widgetClass = footerNavigation.widgetClass;
        }

        get getLinks(): FooterNavigationLink[] {
            const currentLanguage = this.$store.state.currentLanguage
            return this.links[currentLanguage]
        }

        executeLink(link: FooterNavigationLink, event: Event) {
            if(link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link.href})
            }
        }
    }
</script>