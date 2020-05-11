<template>
    <div class="thumbnail-scroller gallery-scroller">
        <a href="#" v-on:click.prevent="previous" class="switch_button_previous icon-single_arrow_left" :title="label('previous')"></a>
        <transition-group name="slide" tag="ul">
            <li v-for="(image, index) in thumbnails" v-bind:key="image.imgId">
                <a href="#" v-on:click.prevent="openFancybox(index)">
                    <figure>
                        <img v-bind:src="image.imgPath" v-bind:alt="image.alt" />
                        <figcaption>{{ image.figcaption }}</figcaption>
                    </figure>
                </a>
            </li>
        </transition-group>
        <a href="#" v-on:click.prevent="next" class="switch_button_next icon-single_arrow_right" :title="label('next')"></a>
    </div>
</template>

<style scoped>
    .slide-move {
        transition: transform 1s ease-in-out;
    }
</style>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
import {ContentSectionImage} from '@/types';
import BaseI18nComponent from "@/components/base/BaseI18nComponent";

@Component
export default class ThumbnailScroller extends BaseI18nComponent {
        /* initialize class variables to use inside template above */
        @Prop() thumbnailImages!: ContentSectionImage[]; // allow component to receive thumbnailImages as property via v-bind:thumbnail-images attribute

        thumbnails: ContentSectionImage[] = [...this.thumbnailImages]; // create copy of thumbnailImages and assign this.thumbnailImages array entries

        next() {
            const thumbnail = this.thumbnails.shift(); // remove first element of array
            if (thumbnail) {
                this.thumbnails.push(thumbnail);
            }
        }

        previous() {
            const thumbnail = this.thumbnails.pop(); // remove last element of array
            if (thumbnail) {
                this.thumbnails.unshift(thumbnail);
            }
        }

        openFancybox(index: number) {
            this.$store.dispatch('loadFancyboxContent', { urls: this.thumbnails, img: true, imgIndex: index}); // call action in /store/index.ts
        }

        @Watch('thumbnailImages')
        thumbnailImagesChanged(): void {
            this.thumbnails = [...this.thumbnailImages];
        }
}
</script>
