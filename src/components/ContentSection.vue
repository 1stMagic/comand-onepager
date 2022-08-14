<template>
    <CmdWidthLimitationWrapper>
        <a :id="'anchor-' + id"></a>

        <!-- begin cmd-headline (headline is required in section) -->
        <CmdHeadline :headlineText="headline" :headlineLevel="1"/>
        <!-- end cmd-headline -->

        <div v-if="imgpath" class="grid-container-create-columns">
            <div class="grid-small-item">
                <img :src="imgpath" alt="image 1" />
            </div>
            <div class="grid-large-item">
                <div v-html="content"></div>
            </div>
        </div>

        <!-- begin cmd-thumbnail-scroller -->
        <CmdThumbnailScroller
            v-else-if="images && images.length > 4"
            :thumbnailScrollerItems="images"
            :cmdSlideButtons="cmdSlideButtons"
            :fullWidth="true"
        />
        <!-- end cmd-thumbnail-scroller -->

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
/* import components from comand-component-library */
import { CmdHeadline } from 'comand-component-library'
import { CmdThumbnailScroller } from 'comand-component-library'
import { CmdWidthLimitationWrapper } from 'comand-component-library'

// import mixins
import BaseI18nComponent from "./mixins/BaseI18nComponent"

export default {
    components: {
        CmdHeadline,
        CmdThumbnailScroller,
        CmdWidthLimitationWrapper
    },
    mixins: [
        BaseI18nComponent
    ],
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
    computed: {
        cmdSlideButtons() {
            return {
                next: {
                    next: {
                        type: "next",
                        iconClass: "icon-single-arrow-right",
                        tooltip: this.label("slidebutton_next.tooltip")
                    }
                },
                prev: {
                    prev: {
                        type: "prev",
                        iconClass: "icon-single-arrow-left",
                        tooltip: this.label("slidebutton_previous.tooltip")
                    }
                }
            }
        }
    }
}
</script>