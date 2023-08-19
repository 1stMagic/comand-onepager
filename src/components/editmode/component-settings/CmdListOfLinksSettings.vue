<template>
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Use large icons"
            v-model="largeIconsModel"
    />
    <CmdFormElement
            element="select"
            labelText="Alignment"
            :selectOptions="textAlignOptions"
            v-model="textAlignModel"
    />
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
            labelText="Use gap"
            v-model="useGapModel"
    />
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Style as box"
            v-model="styleAsBoxModel"
    />
</template>

<script>
export default {
    name: "CmdListOfLinksSettings",
    inheritAttrs: false,
    data() {
        return {
            editableLargeIcons: null,
            editableTextAlign: null,
            textAlignOptions: [
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
            editableOrientation: null,
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
            editableUseGap: null,
            editableStyleAsBox: null
        }
    },
    props: {
        largeIcons: {
            type: Boolean,
            default: false
        },
        textAlign: {
            type: String,
            default: "left"
        },
        orientation: {
            type: String,
            default: "horizontal"
        },
        useGap: {
            type: Boolean,
            default: false
        },
        styleAsBox: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        largeIconsModel: {
            get() {
                return this.editableLargeIcons == null ? this.largeIcons : this.editableLargeIcons
            },
            set(value) {
                this.editableLargeIcons = value
            }
        },
        textAlignModel: {
            get() {
                return this.editableTextAlign == null ? this.textAlign : this.editableTextAlign
            },
            set(value) {
                this.editableTextAlign = value
            }
        },
        orientationModel: {
            get() {
                return this.editableOrientation == null ? this.orientation : this.editableOrientation
            },
            set(value) {
                this.editableOrientation = value
            }
        },
        useGapModel: {
            get() {
                return this.editableUseGap == null ? this.useGap : this.editableUseGap
            },
            set(value) {
                this.editableUseGap = value
            }
        },
        styleAsBoxModel: {
            get() {
                return this.editableStyleAsBox == null ? this.styleAsBox : this.editableStyleAsBox
            },
            set(value) {
                this.editableStyleAsBox = value
            }
        }
    },
    methods: {
        updateCallbackProvider() {
            const data = {
                largeIcons: this.largeIconsModel,
                textAlign: this.textAlignModel,
                orientation: this.orientationModel,
                useGap: this.useGapModel,
                styleAsBox: this.styleAsBoxModel
            }
            return props => {
                props.largeIcons = data.largeIcons
                props.textAlign = data.textAlign
                props.orientation = data.orientation
                props.useGap = data.useGap
                props.styleAsBox = data.styleAsBox
            }
        }
    }
}
</script>

<style scoped>

</style>
