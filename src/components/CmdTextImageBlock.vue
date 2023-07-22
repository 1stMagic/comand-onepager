<template>
    <div class="cmd-text-block flex-container vertical">
        <!-- begin cmdHeadline -->
        <CmdHeadline
                v-if="(cmdHeadline?.headlineText || editModeContext?.editing) && headlinePosition === 'aboveImage'"
                :headlineText="cmdHeadline.headlineText"
                :headlineLevel="cmdHeadline.headlineLevel"
                :textAlign="cmdHeadline.textAlign"
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
                v-if="(cmdHeadline?.headlineText || editModeContext?.editing) && headlinePosition === 'belowImage'"
                 :headlineText="cmdHeadline.headlineText"
                 :headlineLevel="cmdHeadline.headlineLevel"
                 :textAlign="cmdHeadline.textAlign"
        />
        <!-- end cmdHeadline -->

        <!-- begin continuous text -->
        <textarea v-if="editModeContext?.editing" :class="['edit-mode', textAlign]" v-model="editableHtmlContent"></textarea>
        <div v-else-if="htmlContent" v-html="htmlContent" :class="textAlign"></div>
        <!-- end continuous text -->
    </div>
</template>

<script>
import {useEditModeContext} from "../editmode/editModeContext.js"

export default {
    name: "CmdTextImageBlock",
    provide() {
        return {
            editModeContext: this.context
        }
    },
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {tb: true}, this.onPersist, this.onDelete),
            editableHtmlHeadline: this.cmdHeadline?.headlineText || "",
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
        onPersist(data) {
            const htmlContent = this.editableHtmlContent
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                update(props) {
                    props.cmdHeadline = {
                        ...(props.cmdHeadline || {}),
                    }
                    props.cmdHeadline.headlineText = data[0].headlineText
                    props.htmlContent = htmlContent
                }
            }
        },
        onDelete() {
            console.log("CmdTextImageBlock.onDelete()")
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                }
            }
        }
    }
}
</script>