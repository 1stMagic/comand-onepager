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
export default {
    name: "CmdTextImageBlockSettings",
    inheritAttrs: false,
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
        updateCallbackProvider() {
            const headlineUpdateCallback = this.$refs.headlineSettings.updateCallbackProvider()
            const imageUpdateCallback = this.$refs.imageSettings.updateCallbackProvider()
            const paragraphTextAlign = this.paragraphTextAlignModel
            return props => {
                if (!props.cmdHeadline) {
                    props.cmdHeadline = {}
                }
                headlineUpdateCallback(props.cmdHeadline)
                if (!props.cmdImage) {
                    props.cmdImage = {}
                }
                imageUpdateCallback(props.cmdImage)
                props.paragraphTextAlign = paragraphTextAlign
            }
        }
    }
}
</script>

<style scoped>

</style>
