<template>
    <!-- begin cmdHeadline -->
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <!-- end cmdHeadline -->
    <hr />
    <CmdFormElement
            element="select"
            labelText="Orientation"
            :selectOptions="orientationOptions"
            v-model="orientationModel"
    />
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Stretch to full width"
            v-model="fullWidthModel"
    />
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Allow open images Fancybox"
            v-model="allowOpenFancyBoxModel"
    />
</template>

<script>
export default {
    name: "CmdImageGallerySettings",
    inheritAttrs: false,
    data() {
        return {
            orientationOptions: [
                {
                    text: "horizontal",
                    value: "horizontal"
                },
                {
                    text: "vertical",
                    value: "vertical"
                }
            ],
            editableOrientation: null,
            editableFullWidth: null,
            editableAllowOpenFancyBox: null
        }
    },
    props: {
        orientation: {
            type: String,
            default: "horizontal"
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        allowOpenFancyBox: {
            type: Boolean,
            default: true
        },
        cmdHeadline: {
            type: Object,
            default() {
                return {
                    headlineLevel: "2"
                }
            }
        }
    },
    computed: {
        orientationModel: {
            get() {
                return this.editableOrientation == null ? this.orientation : this.editableOrientation
            },
            set(value) {
                this.editableOrientation = value
            }
        },
        fullWidthModel: {
            get() {
                return this.editableFullWidth == null ? this.fullWidth : this.editableFullWidth
            },
            set(value) {
                this.editableFullWidth = value
            }
        },
        allowOpenFancyBoxModel: {
            get() {
                return this.editableAllowOpenFancyBox == null ? this.allowOpenFancyBox : this.editableAllowOpenFancyBox
            },
            set(value) {
                this.editableAllowOpenFancyBox = value
            }
        }
    },
    methods: {
        save(editModeContextData) {
            const headlineData = this.$refs.headlineSettings.save(editModeContextData)
            const data = {
                cmdHeadline: {
                    headlineText: headlineData.headlineText,
                    headlineLevel: headlineData.headlineLevel,
                    textAlign: headlineData.textAlign
                },
                orientation: this.orientationModel,
                fullWidth: this.fullWidthModel,
                allowOpenFancyBox: this.allowOpenFancyBoxModel
            }
            return {
                editModeContextData,
                ...data,
                update(props) {
                    if (!props.cmdHeadline) {
                        props.cmdHeadline = {}
                    }
                    props.cmdHeadline.headlineText = data.cmdHeadline.headlineText
                    props.cmdHeadline.headlineLevel = data.cmdHeadline.headlineLevel
                    props.cmdHeadline.textAlign = data.cmdHeadline.textAlign
                    props.orientation = data.orientation
                    props.fullWidth = data.fullWidth
                    props.allowOpenFancyBox = data.allowOpenFancyBox
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
