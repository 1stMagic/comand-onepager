<template>
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <hr />
    <CmdImageSettings
            ref="imageSettings"
            v-bind="cmdImage || {}"
    />
    <hr />
    <h4>Paragraph</h4>
    <CmdFormElement
            element="select"
            labelText="Paragraph Text-Alignment"
            :selectOptions="paragraphAlignmentOptions"
            v-model="paragraphTextAlignModel"
    />
</template>

<script>
import {h} from "vue";

export default {
    name: "CmdTextImageBlockSettings",
    data() {
        return {
            paragraphAlignmentOptions: [
                {
                    text: "left",
                    value: "left"
                },
                {
                    text: "center",
                    value: "center"
                },
                {
                    text: "right",
                    value: "right"
                }
            ],
            editableParagraphTextAlign: null
        }
    },
    props: {
        cmdHeadline: {
            type: Object,
            required: false
        },
        cmdImage: {
            type: Object,
            required: false
        },
        paragraphTextAlign: {
            type: String,
            default: "left"
        }
    },
    computed: {
        paragraphTextAlignModel: {
            get() {
                return this.editableParagraphTextAlign == null ? this.paragraphTextAlign : this.editableParagraphTextAlign
            },
            set(value) {
                this.editableParagraphTextAlign = value
            }
        }
    },
    methods: {
        save(editModeContextData) {
            const imageData = this.$refs.imageSettings.save(editModeContextData)
            const headlineData = this.$refs.headlineSettings.save(editModeContextData)
            const data = {
                cmdImage: {
                    image: imageData.image,
                    figcaption: imageData.figcaption
                },
                cmdHeadline: {
                    headlineText: headlineData.headlineText,
                    headlineLevel: headlineData.headlineLevel,
                    textAlign: headlineData.textAlign
                },
                paragraphTextAlign: this.paragraphTextAlignModel
            }
            return {
                editModeContextData,
                ...data,
                update(props) {
                    if (!props.cmdImage) {
                        props.cmdImage = {}
                    }
                    if (!props.cmdImage.image) {
                        props.cmdImage.image = {}
                    }
                    if (!props.cmdImage.figcaption) {
                        props.cmdImage.figcaption = {}
                    }
                    props.cmdImage.image.alt = data.cmdImage.image.alt
                    props.cmdImage.image.tooltip = data.cmdImage.image.tooltip
                    props.cmdImage.figcaption.position = data.cmdImage.figcaption.position
                    props.cmdImage.figcaption.textAlign = data.cmdImage.figcaption.textAlign
                    props.cmdImage.figcaption.show = data.cmdImage.figcaption.show

                    if (!props.cmdHeadline) {
                        props.cmdHeadline = {}
                    }
                    props.cmdHeadline.headlineText = data.cmdHeadline.headlineText
                    props.cmdHeadline.headlineLevel = data.cmdHeadline.headlineLevel
                    props.cmdHeadline.textAlign = data.cmdHeadline.textAlign
                    props.paragraphTextAlign = data.paragraphTextAlign
                }
            }
        }
    }
}
</script>

<style scoped>

</style>