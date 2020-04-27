<template>
    <div id="slideshow_wrapper" v-bind:class="{full_width: fullWidth}">
        <div class="section_wrapper slideshow" data-slideshow-autoplay="true">
            <section>
                <div class="slideshow_wrapper">
                    <a href="#" v-on:click.prevent="switchSlide(-1)" class="switch_button_previous icon-single_arrow_left" title="Previous image"></a>
                        <transition name="slideshow-transition">
                            <figure v-bind:key="figureIndex" class="slideshow_item" data-img480="" data-img1023="" data-img="">
                                <a v-bind:href="currentSlide.href" v-bind:title="currentSlide.title" v-bind:target="currentSlide.target">
                                    <img v-bind:src="currentSlide.imgPath" v-bind:alt="currentSlide.alt" />
                                    <figcaption>{{ currentSlide.figcaption }}</figcaption>
                                </a>
                            </figure>
                        </transition>
                    <a href="#" v-on:click.prevent="switchSlide(1)" class="switch_button_next icon-single_arrow_right" title="Next image"></a>
                    <ol>
                        <li v-for="(slide, index) in slides" v-bind:key="index" v-bind:class="{active: index == figureIndex }"><a href="#" v-on:click.prevent="figureIndex = index"></a></li>
                    </ol>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import slideshowWrapper from '@/assets/slideshow_wrapper.json';

    @Component
    export default class SlideshowWrapper extends Vue {
        @Prop() fullWidth: boolean;

        /* initialize class variables to use inside template above */
        slides = [];
        figureIndex = 0;

        /* assign values from json file to class variables */
        created(): void {
            this.slides = slideshowWrapper;
        }

        /* computed property to get current slide */
        get currentSlide(): any {
            return this.slides[this.figureIndex];
        }

        /* switch slides at end and beginning of slideshow */
        switchSlide(change) {
            this.figureIndex = this.figureIndex + change;
            if(this.figureIndex < 0) {
                this.figureIndex = this.slides.length - 1;
            } else if(this.figureIndex >= this.slides.length) {
                this.figureIndex = 0;
            }
        }
    }

</script>