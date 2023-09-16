<template>
    <div class="grid-container-create-columns cmd-image-gallery">
        <!-- begin cmd-headline -->
        <CmdHeadline
             v-if="cmdHeadline?.headlineText || editing"
             v-bind="cmdHeadline"
        />
        <!-- end cmd-headline -->

        <!-- begin default view -->
        <template v-if="!editModeContext">
            <!-- begin images linked to fancybox -->
            <a v-if="useFancyboxForLargeImages" class="image-wrapper" v-for="(image, index) in images"
               :key="index"
               href="#"
               @click.prevent="showFancyBox(index)"
               :title="getMessage('cmdimagegallery.tooltip.open_large_image')">
                <CmdImage :image="image.image" :figcaption="image.figcaption"/>
            </a>
            <!-- end images linked to fancybox -->

            <!-- begin images not linked to fancybox -->
            <div v-else v-for="(image, index) in images" :key="`i${index}`" class="image-wrapper">
                <CmdImage :image="image.image" :figcaption="image.figcaption"/>
            </div>
            <!-- end images not linked to fancybox -->
        </template>
        <!-- end default view -->

        <!-- begin edit-mode view -->
        <EditComponentWrapper
            v-else
            class="image-wrapper edit-items"
            v-for="(image, index) in images"
            :key="index"
            :showComponentName="false"
            :allowedComponentTypes="[]"
            componentName="CmdImage"
            :componentProps="image"
            :componentPath="['props', 'images', index]"
        >
            <CmdImage :image="image.image" :figcaption="image.figcaption" />
        </EditComponentWrapper>
        <!-- end edit-mode view -->
    </div>
</template>

<script>
// import functions
import {openFancyBox, createUuid} from "comand-component-library"
import EditMode from "./mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js"

export default {
    name: "CmdImageGallery",
    mixins: [EditMode],
    props: {
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * set if large version of images can be opened in a fancybox
         */
        useFancyboxForLargeImages: {
            type: Boolean,
            default: true
        },
        /**
         * list of images (incl. captions)
         *
         * @requiredForAccessibility: partial
         */
        images: {
            type: Array,
            required: true
        },
        /**
         * position of figcaption
         *
         * @allowedValues: top, bottom
         */
        figcaptionPosition: {
            type: String,
            default: "bottom"
        }
    },
    methods: {
        showFancyBox(index) {
            openFancyBox({fancyBoxGallery: this.images, defaultGalleryIndex: index})
        },
        getMessage() {
            return ""
        },
        updateHandlerProvider() {
            const htmlContent = this.editableHtmlContent
            return updateHandlerProvider(this, {
                update(props, childUpdateHandlers) {
                    props.htmlContent = htmlContent
                    const cmdHeadlineUpdateHandler = childUpdateHandlers?.find(handler => handler.name === "CmdHeadline")
                    if (cmdHeadlineUpdateHandler) {
                        props.cmdHeadline = props.cmdHeadline || {}
                        cmdHeadlineUpdateHandler.update(props.cmdHeadline)
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-image-gallery ---------------------------------------------------------------------------------------- */
.cmd-image-gallery {
  > .cmd-headline, > input.edit-mode {
    grid-column: span var(--grid-columns);
    margin-bottom: 0;
  }

  > .image-wrapper {
    align-self: center;
    justify-self: center;
    grid-column: span var(--grid-small-span);

    img {
      border: var(--default-border);
      border-radius: var(--border-radius);
      max-height: 30rem;
    }

    figcaption {
      padding: calc(var(--default-padding) / 2);
    }

    &:hover, &:active, &:focus {
      text-decoration: none;

      img {
        border: var(--primary-border);
      }
    }

    & + .pager {
      margin-top: calc(var(--default-margin) * 2);
    }
  }
}

/* end cmd-image-gallery ------------------------------------------------------------------------------------------ */
</style>
