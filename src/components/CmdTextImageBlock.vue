<template>
    <div class="cmd-text-block flex-container vertical">
        <!-- begin cmdHeadline -->
        <CmdHeadline
                v-if="(cmdHeadline?.headlineText || editing) && headlinePosition === 'aboveImage'"
                v-bind="cmdHeadline"
                :componentPath="['props', 'cmdHeadline']"
        />
        <!-- end cmdHeadline -->

        <!-- begin cmdImage -->
        <CmdImage
                v-if="cmdImage"
                :image="cmdImage?.image"
                :figcaption="cmdImage?.figcaption"
        />
        <!-- end cmdImage -->

        <!-- begin cmdHeadline -->
        <CmdHeadline
                v-if="(cmdHeadline?.headlineText || editing) && headlinePosition === 'belowImage'"
                v-bind="cmdHeadline"
        />
        <!-- end cmdHeadline -->

        <!-- begin continuous text -->
        <textarea v-if="editing" :class="['edit-mode', textAlign]" v-model="editableHtmlContent"></textarea>
        <div v-else-if="htmlContent" v-html="htmlContent" :class="textAlign"></div>
        <!-- end continuous text -->
    </div>
</template>

<script>
import EditMode from "./mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js"

export default {
    name: "CmdTextImageBlock",
    mixins: [EditMode],
    data() {
        return {
            editableHtmlContent: this.htmlContent
        }
    },
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * content for continuous text (can contain html-tags)
         */
        htmlContent: {
            type: String,
            required: true
        },
        /**
         * text-alignment for paragraph/continuous text
         */
        paragraphTextAlign: {
            type: String,
            required: false
        },
        /**
         * position for headline
         *
         * @allowedValues: "aboveImage", "belowImage"
         */
        headlinePosition: {
            type: String,
            default: "aboveImage"
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * property for CmdImage-component
         */
        cmdImage: {
            type: Object,
            required: false
        }
    },
    computed: {
        textAlign() {
            if(this.paragraphTextAlign) {
                return "text-align-" + this.paragraphTextAlign
            }
            return ""
        }
    },
    methods: {
        addHandlerProvider() {
            return ""
        },
        updateHandlerProvider() {
            const htmlContent = this.editableHtmlContent
            const children = ["CmdHeadline", "CmdImage"]
            return updateHandlerProvider(this, {
                update(props, childUpdateHandlers) {
                    props.htmlContent = htmlContent
                    childUpdateHandlers?.forEach(childUpdateHandler => {
                        if (children.includes(childUpdateHandler.name)) {
                            const prop = childUpdateHandler.name[0].toLowerCase() + childUpdateHandler.name.slice(1)
                            props[prop] = props[prop] || {}
                            childUpdateHandler.update(props[prop])
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.edit-mode .cmd-text-block textarea {
    width: 100%;
}
</style>
