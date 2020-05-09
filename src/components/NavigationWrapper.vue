<template>
    <div class="grid-item_navigation">
        <div id="navigation_wrapper" v-bind:class="{active: isActive}" >
            <nav id="main-navigation">
                <ul>
                    <li class="close_nav"><a href="#" @click.prevent="isActive = false"><span>Navigation schließen</span><span class="icon-single_arrow_right"></span></a></li>
                    <li v-for="section in $store.state.sections" v-bind:key="section.id" @click="setNavActive(section.id)" v-bind:class="{nav_active: navActive == section.id}">
                        <a v-bind:href="'#anchor_' + section.id">
                            <span v-bind:class="'icon-' + section.iconClass"></span><span>{{ section.navEntry }}</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <a href="#" class="button icon-bars" id="toggle_offcanvas" @click.prevent="isActive = !isActive"></a>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavigationWrapper extends Vue {
    isActive = false;
    navActive = "";
    setNavActive(id: string) {
        this.navActive = id;
    }

}
</script>