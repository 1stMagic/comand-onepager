<template>
    <div class="grid-item_navigation" id="navigation_wrapper">
        <nav id="main-navigation">
            <ul data-editmode="settings" data-editmode-controller-url="//praxisklinik-grevenbroich.de/editmode/controller.php?controller=navigation">
                <li class="close_nav"><a href="#"><span class="icon-single_arrow_left"></span><span>Navigation schließen</span></a></li>
                <li class="nav_active">
                    <a href="#anchor_section1">
                        <span class="icon-home"></span><span>Section 1</span>
                    </a>
                </li>
                <li>
                    <a href="#anchor_section2" class="active">
                        <span class="icon-info"></span><span>Section 2</span>
                    </a>
                </li>
                <li>
                    <a href="#anchor_section3">
                        <span class="icon-cooperations"></span><span>Section 3</span>
                    </a>
                </li>
                <li>
                    <a href="#anchor_section4">
                        <span class="icon-mail"></span><span>Section 4</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Languages from '@/language'

@Component
export default class NavigationWrapper extends Vue {

}

</script>