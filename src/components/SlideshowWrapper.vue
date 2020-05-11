<template>
    <div id="slideshow_wrapper" v-bind:class="{full_width: fullWidth}">
        <div class="section_wrapper slideshow" @mouseenter="pause = true" @mouseleave="pause = false">
            <section>
                <div class="slideshow_wrapper">
                    <a href="#" v-on:click.prevent="showPrevItem" class="switch_button_previous icon-single_arrow_left" :title="label('previous')"></a>
                    <transition name="slideshow-transition">
                        <figure v-if="currentItem" v-bind:key="index" class="slideshow_item">
                            <a v-if="currentItem.href" v-bind:href="currentItem.href" v-bind:title="currentItem.title">
                                <img v-bind:src="currentItem.imgPath" v-bind:alt="currentItem.alt" />
                                <figcaption>{{ currentItem.figcaption }}</figcaption>
                            </a>
                            <template v-else>
                                <img v-bind:src="currentItem.imgPath" v-bind:alt="currentItem.alt" />
                                <figcaption>{{ currentItem.figcaption }}</figcaption>
                            </template>
                        </figure>
                    </transition>
                    <a href="#" v-on:click.prevent="showNextItem" class="switch_button_next icon-single_arrow_right" :title="label('next')"></a>
                    <ol>
                        <li v-for="(item, i) in items" v-bind:key="i" v-bind:class="{active: i == index }"><a href="#" v-on:click.prevent="index = i"></a></li>
                    </ol>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import {SlideshowItem, SlideshowImage} from '@/types';
    import {imageSliderClient} from '@/api/SlideshowClient';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";

    @Component
    export default class SlideshowWrapper extends BaseI18nComponent {
        private static readonly NOT_YET_PRELOADED_IMAGE = (image: SlideshowImage) => !image.loaded;
        private static readonly NOT_YET_PRELOADED_IMAGES = (item: SlideshowItem) => item.images && item.images.find(SlideshowWrapper.NOT_YET_PRELOADED_IMAGE);

        @Prop({ default: false }) fullWidth!: boolean;
        @Prop({ default: false }) autoplay!: boolean;
        @Prop({ default: 5000 }) autoplayInterval!: number;

        /* initialize class variables to use inside template above */
        private items: SlideshowItem[] = [];
        private index = 0;
        private pause = false;
        private hnd: number | null = null;
        private preloadComplete = false;

        /* assign values from json file to class variables */
        private created(): void {
            imageSliderClient.getItems(this.$store.state.currentLanguage)
                .then(this.setupSlider)
                .catch(e => console.error('Error loading slideshow images', e));
        }

        private beforeDestroy(): void {
            if (this.hnd !== null) {
                window.clearInterval(this.hnd);
                this.hnd = null;
            }
        }

        /* computed property to get current slide */
        get currentItem(): SlideshowImage | null {
            return this.getDeviceImage(this.items[this.index]);
        }

        private showPrevItem(): void {
            if (this.index > 0) {
                this.index--;
            } else {
                this.index = this.items.length - 1;
            }
            this.preload(this.index);
        }

        private showItem(i: number): void {
            if (i >= 0 && i < this.items.length) {
                this.index = i;
                this.preload(this.index);
            }
        }

        private showNextItem(): void {
            if (this.index < this.items.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
            this.preload(this.index);
        }

        private setupSlider(items: SlideshowItem[]): void {
            this.items = items;
            this.preload();
            if (this.autoplay && this.hnd === null) {
                this.hnd = window.setInterval(() => this.pause || this.showNextItem(), this.autoplayInterval);
            }
        }

        private preload(index = 0, num = 2): void {
            if (!this.preloadComplete) {
                for (let i = index, n = index + num, c = this.items.length; i < n && i < c; i++) {
                    const image = this.getDeviceImage(this.items[i]);
                    if (image && !image.loaded) {
                        image.loaded = true;
                        new Image().src = image.imgPath;
                    }
                }
                this.preloadComplete = !this.items.find(SlideshowWrapper.NOT_YET_PRELOADED_IMAGES);
            }
        }

        private getDeviceImage(item: SlideshowItem | undefined): SlideshowImage | null {
            if (item === undefined || item.images === undefined) {
                return null;
            }
            const deviceWidth = window.innerWidth;
            for (let i = 0, c = item.images.length; i < c; i++) {
                const image = item.images[i];
                if (!image.maxWidth || deviceWidth <= image.maxWidth) {
                    return image;
                }
            }
            return item.images.length ? item.images[0] : null;
        }

        @Watch('$store.state.currentLanguage')
        private languageChanged(newLanguage: string) {
            imageSliderClient.getItems(newLanguage)
                .then(this.setupSlider)
                .catch(e => console.error('Error loading slideshow images', e));
        }
    }

</script>
