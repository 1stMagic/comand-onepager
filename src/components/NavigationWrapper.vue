<template>
    <div class="grid-item_navigation" id="navigation_wrapper">
        <nav id="main-navigation">
            <ul data-editmode="settings" data-editmode-controller-url="//praxisklinik-grevenbroich.de/editmode/controller.php?controller=navigation">
                <li class="close_nav"><a href="#"><span class="icon-single_arrow_left"></span><span>Navigation schließen</span></a></li>
                <li v-for="section in sections" v-bind:key="section.id" @click="setNavActive(section.id)" v-bind:class="{nav_active: navActive == section.id}">
                    <a v-bind:href="'#anchor_' + section.id">
                        <span v-bind:class="'icon-' + section.iconClass"></span><span>{{ section.navEntry }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Languages from '@/language.ts'
import sectionContent from '@/assets/content_sections.json';
import hours from '@/assets/opening_hours.json';

@Component
export default class NavigationWrapper extends Vue {
    sections: any[] = [];

    navActive = "";
    setNavActive(id) {
        this.navActive = id;
    }

    created(): void {
      this.sections = sectionContent;
    }

}


</script>