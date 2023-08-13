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
    inheritAttrs: false,
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
        updateCallbackProvider() {
            const headlineUpdateCallback = this.$refs.headlineSettings.updateCallbackProvider()
            const useFancyboxForLargeImages = this.useFancyboxForLargeImagesModel
            return props => {
                if (!props.cmdHeadline) {
                    props.cmdHeadline = {}
                }
                headlineUpdateCallback(props.cmdHeadline)
                props.useFancyboxForLargeImages = useFancyboxForLargeImages
            }
        }
    }
}
</script>

<style scoped>

</style>
