<template>
    <div class="grid-container-create-columns cmd-image-gallery">
        <!-- begin cmd-headline -->
        <CmdHeadline
             v-if="cmdHeadline?.headlineText || editModeContext?.editing"
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
        <EditComponentWrapper v-else
          class="image-wrapper"
          v-for="(image, index) in images" :key="'x' + index"
          componentName="CmdImage"
          :componentProps="image"
          :editModeContextData="{imageIndex: index}"
          :componentIdentifier="componentIdentifier(index)"
        >
            <CmdImage
                    :image="image.image"
                    :figcaption="image.figcaption"
                    :editModeContextData="{imageIndex: index}"
            />
        </EditComponentWrapper>
        <!-- end edit-mode view -->
    </div>
</template>

<script>
// import functions
import {openFancyBox} from "comand-component-library"
import {useEditModeContext} from "../editmode/editModeContext.js"

// import mixins
//import I18n from "../mixins/I18n"
//import DefaultMessageProperties from "../mixins/CmdImageGallery/DefaultMessageProperties"

export default {
    name: "CmdImageGallery",
    mixins: [],
    provide() {
        return {
            editModeContext: this.context
        }
    },
    inject: {
        editModeContext: {
            default: null
        }
    },
    props: {
        editModeContextData: {
            type: Object
        },
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
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {}, this.onSave, this.onDelete)
        }
    },
    methods: {
        componentIdentifier(index) {
            const identifier = []
            identifier.push(this.editModeContext.props.sectionId)
            identifier.push(this.editModeContextData.componentIndex)

            if(this.editModeContextData.childComponentIndex != null) {
                identifier.push(this.editModeContextData.childComponentIndex)
            }

            identifier.push(index)

            return identifier.join(".")
        },
        showFancyBox(index) {
            openFancyBox({fancyBoxGallery: this.images, defaultGalleryIndex: index})
        },
        getMessage() {
            return ""
        },
        onSave(data) {
            const imageIndex = data[0].editModeContextData.imageIndex
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                update(props) {
                    props.images[imageIndex].image = {
                        ...props.images[imageIndex].image,
                        ...data[0].image
                    }
                    props.images[imageIndex].figcaption = {
                        ...props.images[imageIndex].figcaption,
                        ...data[0].figcaption
                    }
                }
            }
        },
        onDelete(data) {
            console.log("CmdImageGallery.onDelete", data)
            const result = {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                }
            }
            if (data && data.length > 0) {
                const imageIndex = data[0].editModeContextData.imageIndex
                result.delete = (props) => props.images.splice(imageIndex, 1)
            }
            return result
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