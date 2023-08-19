<template>
    <CmdFormElement
            element="input"
            type="text"
            labelText="Headline Text"
            placeholder="Headline Text"
            v-model="headlineTextModel"
    />
    <div class="flex-container">
        <CmdFormElement
                element="select"
                labelText="Level"
                :selectOptions="headlineLevelOptions"
                v-model="headlineLevelModel"
        />
        <CmdFormElement
                element="select"
                labelText="Alignment"
                :selectOptions="textAlignOptions"
                v-model="textAlignModel"
        />
    </div>
</template>

<script>
export default {
    name: "CmdHeadlineSettings",
    inheritAttrs: false,
    data() {
        return {
            editableHeadlineText: null,
            editableHeadlineLevel: null,
            headlineLevelOptions: [
                {
                    text: "1",
                    value: "1"
                },
                {
                    text: "2",
                    value: "2"
                },
                {
                    text: "3",
                    value: "3"
                },
                {
                    text: "4",
                    value: "4"
                },
                {
                    text: "5",
                    value: "5"
                },
                {
                    text: "6",
                    value: "6"
                }
            ],
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
            ]
        }
    },
    props: {
        headlineText: {
            type: String,
            default: ""
        },
        headlineLevel: {
            type: [String, Number]
        },
        textAlign: {
            type: String,
            default: "left"
        }
    },
    computed: {
        headlineTextModel: {
            get() {
                return this.editableHeadlineText == null ? this.headlineText : this.editableHeadlineText
            },
            set(value) {
                this.editableHeadlineText = value
            }
        },
        headlineLevelModel: {
            get() {
                return (this.editableHeadlineLevel == null ? this.headlineLevel : this.editableHeadlineLevel) || "1"
            },
            set(value) {
                this.editableHeadlineLevel = value
            }
        },
        textAlignModel: {
            get() {
                return this.editableTextAlign == null ? this.textAlign : this.editableTextAlign
            },
            set(value) {
                this.editableTextAlign = value
            }
        }
    },
    methods: {
        updateCallbackProvider() {
            const headlineText =  this.headlineTextModel
            const headlineLevel =  this.headlineLevelModel
            const textAlign =  this.textAlignModel
            return props => {
                props.headlineText = headlineText
                props.headlineLevel = headlineLevel
                props.textAlign = textAlign
            }
        }
    }
}
</script>

<style scoped>

</style>
