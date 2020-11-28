<template>
    <div class="section-wrapper">
        <a :id="'anchor-' + id"></a>
        <section>
            <h2>{{ headline }}</h2>
            <div v-if="imgpath" class="grid-container-create-columns">
                <div class="grid-small-item">
                    <img :src="imgpath" alt="image 1" />
                </div>
                <div class="grid-large-item">
                    <div v-html="content"></div>
                </div>
            </div>
            <CmdThumbnailScroller v-else-if="images && images.length > 4" :thumbnailScrollerItems="images" />
            <div v-else-if="images && images.length < 5" class="grid-container-create-columns">
                <div v-for="(image, index) in images" :key="index" class="grid-small-item">
                    <figure>
                        <img :src="image.imgPath" :alt="image.alt"/>
                        <figcaption v-if="image.figcaption">{{ image.figcaption }}</figcaption>
                    </figure>
                </div>
            </div>
            <div v-else v-html="content"></div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import { CmdThumbnailScroller } from "comand-ui-kit";
    import {ContentSectionImage} from "@/types";

    @Component({
        components: {
            CmdThumbnailScroller
        }
    })

    export default class ContentSection extends Vue {
        @Prop() id!: string;
        @Prop() headline!: string;
        @Prop() imgpath!: string;
        @Prop() images!: ContentSectionImage[];
        @Prop() content!: string;
    }
</script>