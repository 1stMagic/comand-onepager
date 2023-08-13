<template>
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <hr />

    <CmdFormElement
            element="input"
            type="text"
            labelText="Abbreviation text for hours"
            v-model="abbreviationTextModel"
    />

    <CmdFormElement
            element="select"
            :select-options="separators"
            labelText="Select separator (for time span)"
            v-model="separatorModel"
    />
</template>

<script>
export default {
    name: "CmdOpeningHoursSettings",
    inheritAttrs: false,
    data() {
        return {
            separators: [
                {
                    text: "– (n-dash)",
                    value: "–"
                },
                {
                    text: "- (minus)",
                    value: "-"
                },
                {
                    text: "till",
                    value: "till"
                }
            ],
            editableAbbreviationText: null,
            editableSeparator: null
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
        showAbbreviationText: {
            type: Boolean,
            default: false
        },
        /**
         * show an icon (if exists) in front of label-text
         */
        abbreviationText: {
            type: String,
            default: "h"
        },
        /**
         * show a label-text for each entry
         */
        separator: {
            type: String,
            default: "–"
        },
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        abbreviationTextModel: {
            get() {
                return this.editableAbbreviationText == null ? this.abbreviationText : this.editableAbbreviationText
            },
            set(value) {
                this.editableAbbreviationText = value
            }
        },
        separatorModel: {
            get() {
                return this.editableSeparator == null ? this.separator : this.editableSeparator
            },
            set(value) {
                this.editableSeparator = value
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
                abbreviationText: this.abbreviationTextModel,
                separator: this.separatorModel
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
                    props.abbreviationText = data.abbreviationText
                    props.separator = data.separator
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
