<template>
    <div v-bind:class="'grid-item_' + widgetClass">
        <h4>{{ widgetHeadline }}</h4>
        <ul>
            <template v-for="(link, index) in links">
                <li v-bind:key="index"><a v-bind:href="link.href" v-bind:target="link.target" v-on:click.prevent="openFancybox(link)">{{ link.name }}</a></li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {FooterNavigationLink} from '@/types';
import footerNavigation from '@/assets/footer_navigation.json';

@Component
export default class FooterNavigation extends Vue {
        /* initialize class variables to use inside template above */
        links: FooterNavigationLink[] = [];
        widgetClass = "";
        widgetHeadline = "";

        /* assign values from json file to class variables */
        created(): void {
            this.links = footerNavigation.links;
            this.widgetClass = footerNavigation.widgetClass;
            this.widgetHeadline = footerNavigation.widgetHeadline;
        }

        openFancybox(link: FooterNavigationLink) {
            this.$store.dispatch('loadFancyboxContent', {url: link.fancyboxContentURL, img: false}); // call action in /store/index.ts
        }
}
</script>