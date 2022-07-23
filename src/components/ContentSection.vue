<template>
    <CmdWidthLimitationWrapper>
        <a :id="'anchor-' + id"></a>
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
    </CmdWidthLimitationWrapper>
</template>

<script>
    /* import used components */
    import { CmdThumbnailScroller } from 'comand-component-library'
    import { CmdWidthLimitationWrapper } from 'comand-component-library'

    export default {
        props: {
            id: {
                type: String,
                required: false
            },
            headline: {
                type: String,
                required: false
            },
            imgpath: {
                type: String,
                required: false
            },
            images: {
                type: Array,
                required: false
            },
            content: {
                type: String,
                required: false
            }
        },
        components: {
            CmdThumbnailScroller,
            CmdWidthLimitationWrapper
        }
    }
</script>