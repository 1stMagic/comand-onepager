<template>
    <CmdFormElement
            element="input"
            type="text"
            labelText="Link text"
            placeholder="Link text"
            v-model="textModel"
    />
    <CmdFormElement
            element="input"
            type="url"
            labelText="URL"
            placeholder="URL"
            :required="true"
            v-model="pathModel"
    />
    <CmdFormElement
            element="select"
            labelText="Open content in"
            :selectOptions="targetOptions"
            v-model="targetModel"
    />
</template>

<script>
export default {
    name: "CmdLinkItemSettings",
    inheritAttrs: false,
    data() {
        return {
            editableText: null,
            editablePath: null,
            targetOptions: [
                {
                    text: "new tab",
                    value: "_blank"
                },
                {
                    text: "popup",
                    value: "popup"
                }
            ],
            editableTarget: null
        }
    },
    props: {
        text: {
            type: String,
            default: ""
        },
        path: {
            type: String,
            default: ""
        },
        target: {
            type: String,
            default: "_blank"
        }
    },
    computed: {
        textModel: {
            get() {
                return this.editableText == null ? this.text : this.editableText
            },
            set(value) {
                this.editableText = value
            }
        },
        pathModel: {
            get() {
                return this.editablePath == null ? this.path : this.editablePath
            },
            set(value) {
                this.editablePath = value
            }
        },
        targetModel: {
            get() {
                return this.editableTarget == null ? this.target: this.editableTarget
            },
            set(value) {
                this.editableTarget = value
            }
        }
    },
    methods: {
        save(editModeContextData) {
            const data = {
                text: this.textModel,
                path: this.pathModel,
                target: this.targetModel
            }
            return {
                editModeContextData,
                ...data,
                update(props) {
                    const link = props.links[editModeContextData.linkIndex]
                    link.text = data.text
                    link.path = data.path
                    link.target = data.target
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
