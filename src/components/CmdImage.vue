<template>
    <figure v-if="editContent" :class="['cmd-image flex-container vertical', getTextAlign]">
        <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show figcaption"
            v-model="editableShowFigcaption"
        />
        <CmdFormElement
            element="select"
            labelText="Figcaption Position"
            :selectOptions="positionOptions"
            :disabled="!showFigcaption"
            v-model="editableFigcaptionPosition"
        />
        <CmdFormElement
            element="select"
            labelText="Figcaption text alignment"
            :selectOptions="textAlignOptions"
            :disabled="!showFigcaption"
            v-model="editableFigcaptionTextAlign"
        />
        <template v-if="figcaption?.position === 'top'">
            <CmdFormElement element="input" type="text" :required="true" labelText="Text figcaption" v-model="editableFigcaptionText"/>
        </template>
        <div :class="['box drop-area flex-container vertical', { 'allow-drop': allowDrop }]" v-on="dragAndDropHandler">
            <img ref="contentImage" :src="image.src" :alt="image.alt" :title="image.tooltip" />
        </div>
        <button
            type="button"
            :class="['button upload primary', { disabled: uploadInitiated }]"
            :disabled="uploadInitiated"
            @click="selectFiles()"
        >
            <!-- begin CmdIcon -->
            <CmdIcon iconClass="icon-loop"/>
            <!-- end CmdIcon -->
            <span>Select image</span>
        </button>
        <template v-if="figcaption?.position !== 'top'">
            <CmdFormElement element="input" type="text" :required="true" labelText="Text figcaption" v-model="editableFigcaptionText"/>
        </template>
    </figure>

    <!-- begin CmdFormElement -->
    <CmdFormElement
        v-if="editContent"
        class="hidden"
        element="input"
        type="file"
        labelText="Select file"
        :disabled="uploadInitiated"
        @change="fileSelected"
        ref="formElement"
    />
    <!-- end CmdFormElement -->

    <figure v-else :class="['cmd-image', getTextAlign]">
        <figcaption v-if="figcaption?.show && figcaption?.position === 'top'">{{ figcaption?.text }}</figcaption>
        <img :src="image.src" :alt="image.alt" :title="image.tooltip"/>
        <figcaption v-if="figcaption?.show && figcaption?.position !== 'top'">{{ figcaption?.text }}</figcaption>
    </figure>
</template>

<script>
import {CmdFormElement} from "comand-component-library"
import {CmdIcon} from "comand-component-library"

import {getFileExtension} from "comand-component-library/src/utils/getFileExtension"

export default {
    name: "CmdImage",
    components: {
        CmdFormElement,
        CmdIcon
    },
    data() {
        return {
            allowedFileExtensions: ["jpg", "jpeg", "png"],
            uploadInitiated: false,
            allowDrop: false,
            showFigcaption: true,
            figcaptionPosition: null,
            figcaptionTextAlign: null,
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
    props: {
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
        editModeEvents: {},
        editContent: {
            type: Boolean,
            default: false
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
            default: 1025
        }
    },
    computed: {
        dragAndDropHandler() {
            // register handlers only if drag-and-drop is enabled
            return {
                dragenter: this.dragEnter,
                dragover: this.dragOver,
                dragleave: this.dragLeave,
                drop: this.drop
            }
        },
        getTextAlign() {
            if (this.figcaption?.textAlign) {
                return "text-" + this.figcaption.textAlign
            }
            return ''
        },
        editableShowFigcaption: {
            get() {
                return this.showFigcaption == null ? this.figcaption.show : this.showFigcaption
            },
            set(value) {
                this.showFigcaption = value
            }
        },
        editableFigcaptionPosition: {
            get() {
                return this.figcaptionPosition == null ? this.figcaption.position : this.figcaptionPosition
            },
            set(value) {
                this.figcaptionPosition = value
            }
        },
        editableFigcaptionTextAlign: {
            get() {
                return this.figcaptionTextAlign || this.figcaption.textAlign
            },
            set(value) {
                this.figcaptionTextAlign = value
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
        fileSelected(event) {
            if (event.target.files.length > 0) {
                this.checkAndUploadFile(event.target.files[0])
            }
        },
        selectFiles() {
            let inputFile = this.$refs.formElement.getDomElement().querySelector("input[type='file']")
            inputFile.click()
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
                this.checkAndUploadFile(event.dataTransfer.files[0])
            }
        },
        checkAndUploadFile(file) {
            const errorMessages = []

                // check size for current file
                if (file.size > this.maxFileUploadSize) {
                    errorMessages.push("file too large")
                }

                // check if current file has allowed file-type
                if (!this.allowedFileExtensions.includes(getFileExtension(file.name))) {
                    errorMessages.push("disallowed file extension")
                }

                if(errorMessages.length) {
                    alert(errorMessages)
                    return
                }

                // check for min dimensions
                const image = new Image()

                image.onload = () => {
                    if(image.width < this.minImageWidth) {
                        // errorMessages.push("width (" + image.width + " px) too small - at least " + this.minImageWidth + " px required!")
                        const confirmUpload = confirm("width (" + image.width + " px) too small - at least " + this.minImageWidth + " px required! Use trotzdem!")
                        if(!confirmUpload) {
                            alert("Abbruch")
                            return
                        }
                    }
                    // revoke URL to clean memory
                    URL.revokeObjectURL(image.src)

                    // show preview-image by assigning image.src (containing image date (not its path) to do existing contentImage source
                    this.$refs.contentImage.src = image.src
                }
            // create data-url (contains content of a file (not its path))
            image.src = URL.createObjectURL(file)
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
        align-items: center;
        justify-content: center;
    }
}

/* end cmd-image ------------------------------------------------------------------------------------------ */
</style>