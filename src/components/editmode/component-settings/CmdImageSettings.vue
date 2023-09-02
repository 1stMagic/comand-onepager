<template>
    <h4>Image</h4>
    <a class="image-wrapper" title="Click to select new image" @click="selectFiles()">
        <img v-show="image?.src" :src="image?.src" :alt="image?.alt" ref="contentImage" />
        <span class="no-image" v-if="!image?.src">
            <span class="icon-image"></span>
            <span>(no image uploaded)</span>
        </span>
    </a>

    <!-- begin CmdFormElement -->
    <CmdFormElement
            class="hidden"
            element="input"
            type="file"
            labelText="Select file"
            :disabled="uploadInitiated"
            @change="fileSelected"
            ref="formElement"
    />
    <!-- end CmdFormElement -->
    <h5>Figcaption</h5>
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show figcaption"
            v-model="editableShowFigcaption"
    />
    <div class="flex-container">
        <CmdFormElement
                element="select"
                labelText="Position"
                :selectOptions="positionOptions"
                :disabled="!editableShowFigcaption"
                v-model="editableFigcaptionPosition"
        />
        <CmdFormElement
                element="select"
                labelText="Alignment"
                :selectOptions="textAlignOptions"
                :disabled="!editableShowFigcaption"
                v-model="editableFigcaptionTextAlign"
        />
    </div>
    <CmdFormElement
            element="input"
            type="text"
            :required="true"
            labelText="Alternative Text"
            placeholder="Alternative Text"
            v-model="editableAlternativeText"
    />
    <CmdFormElement
            element="input"
            type="text"
            :required="false"
            labelText="Tooltip"
            placeholder="Tooltip"
            v-model="editableTooltip"
    />
</template>

<script>
import {checkAndUploadFile} from "../../../utils/checkAndUploadFile.js"
export default {
    name: "CmdImageSettings",
    inheritAttrs: false,
    data() {
        return {
            allowedFileExtensions: ["jpg", "jpeg", "png"],
            uploadInitiated: false,
            allowDrop: false,
            showFigcaption: null,
            figcaptionPosition: null,
            figcaptionTextAlign: null,
            tooltip: null,
            alternativeText: null,
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
         * figcaption-object including visibility, position (top/bottom), text
         */
        figcaption: {
            type: Object,
            required: false
        },
        image: {
            type: Object,
            required: false
        }
    },
    computed: {
        editableAlternativeText: {
            get() {
                return this.alternativeText == null ? this.image?.alt : this.alternativeText
            },
            set(value) {
                this.alternativeText = value
            }
        },
        editableTooltip: {
            get() {
                return this.tooltip == null ? this.image?.tooltip : this.tooltip
            },
            set(value) {
                this.tooltip = value
            }
        },
        editableShowFigcaption: {
            get() {
                return this.showFigcaption == null ? this.figcaption?.show : this.showFigcaption
            },
            set(value) {
                this.showFigcaption = value
            }
        },
        editableFigcaptionPosition: {
            get() {
                return this.figcaptionPosition == null ? this.figcaption?.position : this.figcaptionPosition
            },
            set(value) {
                this.figcaptionPosition = value
            }
        },
        editableFigcaptionTextAlign: {
            get() {
                return this.figcaptionTextAlign || this.figcaption?.textAlign
            },
            set(value) {
                this.figcaptionTextAlign = value
            }
        },
        editableFigcaptionText: {
            get() {
                return this.figcaptionText || this.figcaption?.text
            },
            set(value) {
                this.figcaptionText = value
            }
        }
    },
    methods: {
        fileSelected(event) {
            if (event.target.files.length > 0) {
                checkAndUploadFile(event.target.files[0], this.allowedFileExtensions, this.minImageWidth, this.maxFileUploadSize, this.$refs.contentImage)
            }
        },
        selectFiles() {
            let inputFile = this.$refs.formElement.getDomElement().querySelector("input[type='file']")
            inputFile.click()
        },
        updateCallbackProvider() {
            const data = {
                image: {
                    alt: this.editableAlternativeText,
                    tooltip: this.editableTooltip
                },
                figcaption: {
                    position: this.editableFigcaptionPosition,
                    textAlign: this.editableFigcaptionTextAlign,
                    show: this.editableShowFigcaption
                }
            }
            return props => {
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
                props.figcaption.show = data.figcaption.show
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
    border: var(--default-border);
    background: var(--pure-white);

    img {
        border: 0;
    }

    .no-image {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        align-items: center;
        padding: var(--default-padding);

        [class*="icon"] {
            font-size: 7rem;
        }
    }

    &:hover, &:active, &:focus {
        cursor: pointer;
        border-color: var(--hyperlink-color-highlighted);
    }
}
</style>
