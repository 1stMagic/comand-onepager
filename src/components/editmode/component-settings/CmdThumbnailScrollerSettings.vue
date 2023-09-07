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
            :cmdHeadline="{headlineText: 'Thumbnail-Scroller', headlineLevel: 4}">
        <template v-slot:body>
            <div class="flex-container vertical component-settings-wrapper">
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
        updateCallbackProvider() {
            const headlineUpdateCallback = this.$refs.headlineSettings.updateCallbackProvider()
            const data = {
                orientation: this.orientationModel,
                fullWidth: this.fullWidthModel,
                allowOpenFancyBox: this.allowOpenFancyBoxModel
            }
            return props => {
                if (!props.cmdHeadline) {
                    props.cmdHeadline = {}
                }
                headlineUpdateCallback(props.cmdHeadline)

                props.orientation = data.orientation
                props.fullWidth = data.fullWidth
                props.allowOpenFancyBox = data.allowOpenFancyBox
            }
        }
    }
}
</script>

<style scoped>

</style>
<script setup>
</script>