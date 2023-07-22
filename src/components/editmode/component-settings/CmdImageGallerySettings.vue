<template>
    <!-- begin cmdHeadline -->
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <!-- end cmdHeadline -->

    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Use Fancybox for large images"
            v-model="useFancyboxForLargeImagesModel"
    />
</template>

<script>
export default {
    name: "CmdImageGallerySettings",
    data() {
        return {
            editableUseFancyboxForLargeImages: null
        }
    },
    props: {
        cmdHeadline: {
            type: Object,
            required: false
        },
       useFancyboxForLargeImages: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        useFancyboxForLargeImagesModel: {
            get() {
                return this.editableUseFancyboxForLargeImages == null ? this.useFancyboxForLargeImages : this.editableUseFancyboxForLargeImages
            },
            set(value) {
                this.editableUseFancyboxForLargeImages = value
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
                useFancyboxForLargeImages: this.useFancyboxForLargeImagesModel
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
                    props.useFancyboxForLargeImages = data.useFancyboxForLargeImages
                }
            }
        }
    }
}
</script>

<style scoped>

</style>