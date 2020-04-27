<template>
    <div class="section_wrapper">
        <a v-bind:id="'anchor_' + id"></a>
        <section>
            <h2>{{ headline }}</h2>
            <div v-if="imgpath" class="grid-container-create-columns">
                <div class="grid-small-item">
                    <img v-bind:src="imgpath" alt="image 1" />
                </div >
                <div class="grid-large-item">
                    <div v-html="content"></div>
                </div>
            </div>
            <div v-else-if="images" class="grid-container-create-columns">
                <thumbnail-scroller v-if="images.length > 4" v-bind:thumbnail-images="images" />
                <div v-else v-for="(image, index) in images" v-bind:key="index" class="grid-small-item">
                    <img v-bind:src="image.imgPath" v-bind:alt="image.alt" />
                </div >
            </div>
            <div v-else v-html="content"></div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ThumbnailScroller from '@/components/ThumbnailScroller.vue';

@Component ({
              components: {
                  ThumbnailScroller
              }
          })

export default class ContentSection extends Vue {
    @Prop() id;
    @Prop() headline;
    @Prop() imgpath;
    @Prop() images;
    @Prop() content;
}

</script>