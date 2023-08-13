<template>
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <hr />
    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show labels (att all)"
            v-model="showLabelsModel"
    />

    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show icons only (no text)"
            v-model="showIconsOnlyModel"
    />

    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show icons in front of labels"
            v-model="showLabelIconsModel"
    />

    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Show label-texts"
            v-model="showLabelTextsModel"
    />

    <CmdFormElement
            element="input"
            type="checkbox"
            :toggleSwitch="true"
            labelText="Link address with Google Maps &trade;"
            v-model="linkGoogleMapsModel"
    />
</template>

<script>
export default {
    name: "CmdAddressDataSettings",
    inheritAttrs: false,
    data() {
        return {
            editableShowLabels: null,
            editableShowIconsOnly: null,
            editableShowLabelIcons: null,
            editableShowLabelTexts: null,
            editableLinkGoogleMaps: null,
        }
    },
    props: {
        headlineText: {
            type: String,
            default: ""
        },
        headlineLevel: {
            type: [String, Number],
            default: "2"
        },
        /**
         * activate if only icons (without any text) should be displayed
         */
        showIconsOnly: {
            type: Boolean,
            default: false
        },
        /**
         * show an icon (if exists) in front of label-text
         */
        showLabelIcons: {
            type: Boolean,
            default: true
        },
        /**
         * show a label-text for each entry
         */
        showLabelTexts: {
            type: Boolean,
            default: true
        },
        /**
         * option to toggle labels (i.e. telephone, email etc.) in front/left of data
         */
        showLabels: {
            type: Boolean,
            default: true
        },
        /**
         * all address-data (incl. labels) that will be shown
         */
        addressData: {
            type: Object,
            required: true
        },
        /**
         * link physical address (street, no, zip and city) with Google Maps
         */
        linkGoogleMaps: {
            type: Boolean,
            default: false
        },
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        showLabelsModel: {
            get() {
                return this.editableShowLabels == null ? this.showLabels : this.editableShowLabels
            },
            set(value) {
                this.editableShowLabels = value
            }
        },
        showIconsOnlyModel: {
            get() {
                return this.editableShowIconsOnly == null ? this.showIconsOnly : this.editableShowIconsOnly
            },
            set(value) {
                this.editableShowIconsOnly = value
            }
        },
        showLabelIconsModel: {
            get() {
                return this.editableShowLabelIcons == null ? this.showLabelIcons : this.editableShowLabelIcons
            },
            set(value) {
                this.editableShowLabelIcons= value
            }
        },
        showLabelTextsModel: {
            get() {
                return this.editableShowLabelTexts == null ? this.showLabelTexts : this.editableShowLabelTexts
            },
            set(value) {
                this.editableShowLabelTexts= value
            }
        },
        linkGoogleMapsModel: {
            get() {
                return this.editableLinkGoogleMaps == null ? this.linkGoogleMaps : this.editableLinkGoogleMaps
            },
            set(value) {
                this.editableLinkGoogleMaps= value
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
                showIconsOnly: this.showIconsOnlyModel,
                showLabelIcons: this.showLabelIconsModel,
                showLabelTexts: this.showLabelTextsModel,
                showLabels: this.showLabelsModel,
                linkGoogleMaps: this.linkGoogleMapsModel
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
                    props.showIconsOnly = data.showIconsOnly
                    props.showLabelIcons = data.showLabelIcons
                    props.showLabelTexts = data.showLabelTexts
                    props.showLabels = data.showLabels
                    props.linkGoogleMaps = data.linkGoogleMaps
                }
            }
        }
    }
}
</script>

<style scoped>

</style>