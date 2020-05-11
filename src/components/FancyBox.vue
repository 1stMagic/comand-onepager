<template>
    <div id="fancybox" class="popup_wrapper" v-if="$store.state.fancybox.status">
        <div class="popup">
            <div class="button_wrapper">
                <a href="#" class="button icon-print" id="print_color" :title="label('print_in_color')"></a>
                <a href="#" class="button icon-print" id="print_black_white" :title="label('print_in_grayscale')"></a>
                <a href="#" class="icon-cancel" title="Close"
                   v-on:click.prevent="$store.commit('setFancybox', { status: false, img: false, content: ''})"></a>
            </div>
            <div class="clearfix">
                <a href="#" v-if="image" class="switch_button_previous icon-single_arrow_left"
                   :title="label('previous')" v-on:click.prevent="previous"></a>
                <div class="content" v-if="!image" v-html="$store.state.fancybox.content.mainContent"></div>
                <img v-else v-bind:src="$store.state.fancybox.images[index].imgPath"
                     v-bind:title="$store.state.fancybox.images[index].alt"/>
                <a href="#" v-if="image" class="switch_button_next icon-single_arrow_right" :title="label('next')"
                   v-on:click.prevent="next"></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Watch} from 'vue-property-decorator';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";

    @Component
    export default class FancyBox extends BaseI18nComponent {

        index = 0;

        @Watch('$store.state.fancybox.status')
        onStatusChange() {
            this.index = this.$store.state.fancybox.imgIndex;
        }

        // assign img from store to image (computed property)
        get image() {
            return this.$store.state.fancybox.img
        }

        next() {
            if (this.index < this.$store.state.fancybox.images.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
        }

        previous() {
            if (this.index == 0) {
                this.index = this.$store.state.fancybox.images.length - 1;
            } else {
                this.index--;
            }
        }
    }
</script>
