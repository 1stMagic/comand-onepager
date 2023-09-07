<template>
    <CmdBox :use-slots="['body']" :collapsible="true" :cmdHeadline="{headlineText: 'Headline', headlineLevel: 4}">
        <template v-slot:body>
            <!-- begin cmdHeadline -->
            <CmdHeadlineSettings
                    ref="headlineSettings"
                    v-bind="cmdHeadline || {}"
            />
            <!-- end cmdHeadline -->
        </template>
    </CmdBox>
    <CmdBox :use-slots="['body']"
            :collapsible="true"
            :cmdHeadline="{headlineText: 'Image Gallery', headlineLevel: 4}">
        <template v-slot:body>
            <div class="flex-container vertical component-settings-wrapper">
                <CmdFormElement
                    element="input"
                    type="checkbox"
                    :toggleSwitch="true"
                    labelText="Use Fancybox for large images"
                    v-model="useFancyboxForLargeImagesModel"
                />
            </div>
        </template>
    </CmdBox>
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
