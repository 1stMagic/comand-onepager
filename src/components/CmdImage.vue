<template>
    <!-- begin edit-mode -->
    <figure v-if="editModeContext?.editing" :class="['cmd-image flex-container vertical', getTextAlign]">
        <template v-if="figcaption?.position === 'top'">
            <CmdFormElement element="input" type="text" :required="true" labelText="Text figcaption"
                            v-model="editableFigcaptionText"/>
        </template>
        <div :class="['box drop-area flex-container vertical', { 'allow-drop': allowDrop }]" v-on="dragAndDropHandler" title="Drag new image to this area to replace old one!">
            <span class="icon-image"></span>
            <img :src="imageSource" :alt="image.alt" :title="image.tooltip"/>
        </div>

        <template v-if="figcaption?.position !== 'top'">
            <CmdFormElement
                    element="input"
                    type="text"
                    :class="getTextAlign"
                    :required="true"
                    labelText="Text figcaption"
                    v-model="editableFigcaptionText"
            />
        </template>
    </figure>
    <!-- end edit-mode -->

    <figure v-else :class="['cmd-image', getTextAlign]">
        <figcaption v-if="figcaption?.show && figcaption?.position === 'top'">{{ figcaption?.text }}</figcaption>
        <img :src="imageSource" :alt="image.alt" :title="image.tooltip"/>
        <figcaption v-if="figcaption?.show && figcaption?.position !== 'top'">{{ figcaption?.text }}</figcaption>
    </figure>
</template>

<script>
import {CmdFormElement} from "comand-component-library"
import {CmdIcon} from "comand-component-library"

import {checkAndUploadFile} from "../utils/checkAndUploadFile"

export default {
    name: "CmdImage",
    inject: {
        editModeContext: {
            default: null
        }
    },
    components: {
        CmdFormElement,
        CmdIcon
    },
    data() {
        return {
            mediumMaxWidth: 1023,
            smallMaxWidth: 600,
            currentWindowWidth: window.innerWidth,
            allowedFileExtensions: ["jpg", "jpeg", "png", "webp"],
            uploadInitiated: false,
            allowDrop: false,
            showFigcaption: true,
            figcaptionPosition: null,
            figcaptionTextAlign: null,
            tooltip: null,
            alternativeText: null,
            newImageSource: null,
            positionOptions: [
                {
                    text: "Above image",
                    value: "top"
                },
                {
                    text: "Below image",
                    value: "bottom"
                }
            ],
            textAlignOptions: [
                {
                    text: "Left",
                    value: "left"
                },
                {
                    text: "Center",
                    value: "center"
                },
                {
                    text: "Right",
                    value: "right"
                }
            ],
            figcaptionText: null
        }
    },
    mounted() {
        this.editModeContext?.addSaveHandler(this.onSave)
        this.editModeContext?.addDeleteHandler(this.onDelete)
    },
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * image-object including source, alternative text, tooltip (not required)
         */
        image: {
            type: Object,
            required: true
        },
        /**
         * figcaption-object including visibility, position (top/bottom), text
         */
        figcaption: {
            type: Object,
            required: false
        },
        /**
         * max file size (in bytes) for file to upload
         */
        maxFileUploadSize: {
            type: Number,
            default: 500000
        },
        minImageWidth: {
            type: Number,
            default: 600
        }
    },
    created() {
        // get current window width on window-resize
        window.addEventListener("resize", this.updateWindowWidth)

        // assign css-breakpoints (as integer to eliminate px-unit) to data-properties to have access to them in vue
        const computedStyle = getComputedStyle(document.documentElement);
        this.mediumMaxWidth = parseInt(computedStyle.getPropertyValue("--medium-max-width"))
        this.smallMaxWidth = parseInt(computedStyle.getPropertyValue("--small-max-width"))
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateWindowWidth)
    },
    computed: {
        imageSource() {
            // check if a new image is provided
            if(this.newImageSource) {
                return this.newImageSource
            }

            // if only one src exists
            const imgSrc = this.image.src

            if(typeof imgSrc === "string") {
                return imgSrc
            }

            const deviceWidth = this.currentWindowWidth;
            // return image for small-devices (if exists)
            if(imgSrc.small && deviceWidth <= this.smallMaxWidth) {
                return imgSrc.small
            }
            // return image for medium-devices (if exists)
            if (imgSrc.medium && deviceWidth <= this.mediumMaxWidth) {
                return imgSrc.medium
            }
            // else return large (will be used if images for small-and -medium-devices do not exist or if screen resolution is larger than mediumMaxWidth)
            return imgSrc.large
        },
        getTextAlign() {
            if (this.figcaption?.textAlign) {
                return "text-" + this.figcaption.textAlign
            }
            return ''
        },
        dragAndDropHandler() {
            // register handlers only if drag-and-drop is enabled
            return {
                dragenter: this.dragEnter,
                dragover: this.dragOver,
                dragleave: this.dragLeave,
                drop: this.drop
            }
        },
        editableFigcaptionText: {
            get() {
                return this.figcaptionText || this.figcaption.text
            },
            set(value) {
                this.figcaptionText = value
            }
        }
    },
    methods: {
        updateWindowWidth() {
            this.currentWindowWidth = window.innerWidth
        },
        getImage() {
            return {
                image: {...this.image},
                figcaption: {
                    show: this.editableShowFigcaption,
                    position: this.editableFigcaptionPosition,
                    textAlign: this.editableFigcaptionTextAlign,
                    text: this.editableFigcaptionText
                }
            }
        },
        dragEnter(event) {
            this.dragOver(event)
        },
        dragOver(event) {
            if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 0) {
                event.dataTransfer.dropEffect = "none"

                let item = event.dataTransfer.items[0]

                if (item.kind === "file") {
                    event.preventDefault()
                    event.dataTransfer.dropEffect = "copy"
                    this.allowDrop = true
                    // this._handle_dragover(event)
                }
            }
        },
        dragLeave() {
            this.allowDrop = false
        },
        drop(event) {
            this.allowDrop = false
            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                event.preventDefault()
                checkAndUploadFile(event.dataTransfer.files[0], this.allowedFileExtensions, this.minImageWidth, this.maxFileUploadSize, (imageSource) => this.newImageSource = imageSource)
            }
        },
        onSave() {
            console.log("image.save")
            const data = {
                image: {
                    alt: this.editableAlternativeText,
                    tooltip: this.editableTooltip
                },
                figcaption: {
                    position: this.editableFigcaptionPosition,
                    textAlign: this.editableFigcaptionTextAlign,
                    text: this.editableFigcaptionText,
                    show: this.editableShowFigcaption
                }
            }
            return {
                editModeContextData: this.editModeContextData,
                ...data,
                update(props) {
                    console.log("CmdImage.update", props)
                    if (!props.image) {
                        props.image = {}
                    }
                    props.image.alt = data.image.alt
                    props.image.tooltip = data.image.tooltip
                    if (!props.figcaption) {
                        props.figcaption = {}
                    }
                    props.figcaption.position = data.figcaption.position
                    props.figcaption.textAlign = data.figcaption.textAlign
                    props.figcaption.text = data.figcaption.text
                    props.figcaption.show = data.figcaption.show
                }
            }
        },
        onDelete() {
            console.log("CmdImage.onDelete()")
            return {
                editModeContextData: this.editModeContextData
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-image ------------------------------------------------------------------------------------------ */
.cmd-image {
  &.text-center {
    figcaption {
      text-align: center;
    }
  }

  &.text-right {
    figcaption {
      text-align: right;
    }
  }

  .drop-area {
    border: 0;
    align-items: center;
    justify-content: center;
    padding: 0;

    > [class*="icon"] {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 10rem;
      color: var(--pure-white);
      text-shadow: var(--text-shadow);
      z-index: 10;
    }

    img {
      opacity: .7;
      transition: var(--default-transition);

      &:hover, :active, :focus {
        opacity: 1;
        transition: var(--default-transition);
      }
    }
  }
}

/* end cmd-image ------------------------------------------------------------------------------------------ */
</style>