<template>
    <div class="thumbnail-scroller gallery-scroller">
        <a href="#" class="switch_button_previous icon-single_arrow_left" title="Previous"></a>
        <ul data-fancybox-element="image-scroller">
            <li v-for="(image, index) in thumbnailImages" v-bind:key="index">
                <a href="#" v-on:click="fancybox = true">
                    <figure>
                        <img v-bind:src="image.imgPath" v-bind:alt="image.alt" />
                        <figcaption>{{ image.figcaption }}</figcaption>
                    </figure>
                </a>
            </li>
        </ul>
        <a href="#" class="switch_button_next icon-single_arrow_right" title="Next"></a>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component

export default class ThumbnailScroller extends Vue {
        /* initialize class variables to use inside template above */
        @Prop() thumbnailImages; // allow component to receive thumbnailImages as property via v-bind:thumbnail-images attribute
}
</script>