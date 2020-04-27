<template>
    <div id="fancybox" class="popup_wrapper" v-if="$store.state.fancybox">
        <div class="popup">
            <div class="button_wrapper">
                <a href="#" class="button icon-print" id="print_color" title="Print in color" data-fancybox-element="print"></a>
                <a href="#" class="button icon-print" id="print_black_white" title="Print in grayscale" data-fancybox-element="print"></a>
                <a href="#" class="icon-cancel" title="Close" v-on:click.prevent="$store.commit('setFancybox', false)"></a>
            </div>
            <div class="clearfix">
                <a href="#" class="switch_button_previous icon-single_arrow_left" title="Previous" data-fancybox-element="nav-prev"></a>
                <div class="content" v-html="$store.state.content.mainContent"></div>
                <a href="#" class="switch_button_next icon-single_arrow_right" title="Next" data-fancybox-element="nav-next"></a>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FancyBox extends Vue {

}
</script>