<template>
    <div v-if="!editModeContext"
         :class="['cmd-headline', {'has-pre-headline-text': preHeadlineText, 'has-icon': headlineIcon?.iconClass}, getTextAlign]">
        <!-- begin CmdIcon -->
        <CmdIcon v-if="headlineIcon" :iconClass="headlineIcon?.iconClass" :type="headlineIcon?.iconType"/>
        <!-- end CmdIcon -->

        <div v-if="preHeadlineText">
            <span class="pre-headline-text">{{ preHeadlineText }}</span>
            <component v-if="headlineText" :is="headlineTag">
                <!-- being slot -->
                <slot>{{ headlineText }}</slot>
                <!-- end slot -->
            </component>
        </div>
        <component v-else-if="headlineText" :is="headlineTag">
            <!-- being slot -->
            <slot>{{ headlineText }}</slot>
            <!-- end slot -->
        </component>
    </div>

    <!-- begin edit-mode -->
    <EditComponentWrapper
        v-else
        ref="editComponentWrapper"
        class="edit-items"
        :showComponentName="false"
        :allowedComponentTypes="[]"
        componentName="CmdHeadline"
        :componentProps="{headlineText, headlineLevel}"
        :componentPath="headlineComponentPath"
    >
        <template v-slot="slotProps">
            <CmdFormElement
                v-if="slotProps.editing"
                element="input"
                type="text"
                :class="['edit-mode', 'headline', 'h'+ headlineLevel, getTextAlign]"
                labelText="Headline"
                :showLabel="false"
                placeholder="Headline"
                v-model="editableHeadlineText"
            />
            <div v-else
                 :class="['cmd-headline', {'has-pre-headline-text': preHeadlineText, 'has-icon': headlineIcon?.iconClass}, getTextAlign]">
                <!-- begin CmdIcon -->
                <CmdIcon v-if="headlineIcon" :iconClass="headlineIcon?.iconClass" :type="headlineIcon?.iconType"/>
                <!-- end CmdIcon -->

                <div v-if="preHeadlineText">
                    <span class="pre-headline-text">{{ preHeadlineText }}</span>
                    <component v-if="headlineText" :is="headlineTag">
                        <!-- being slot -->
                        <slot>{{ headlineText }}</slot>
                        <!-- end slot -->
                    </component>
                </div>
                <component v-else-if="headlineText" :is="headlineTag">
                    <!-- being slot -->
                    <slot>{{ headlineText }}</slot>
                    <!-- end slot -->
                </component>
            </div>
        </template>
    </EditComponentWrapper>
    <!-- end edit-mode -->
</template>

<script>
import EditMode from "./mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js"

export default {
    name: "CmdHeadline",
    mixins: [EditMode],
    data() {
        return {
            editableHeadlineText: null,
            editablePreHeadlineText: null
        }
    },
    props: {
        /**
         * text for headline
         */
        headlineText: {
            type: String,
            required: false
        },
        /**
         * level for headline
         */
        headlineLevel: {
            type: [String, Number],
            default: "2"
        },
        /**
         * small pre-headline-text above main-headline
         */
        preHeadlineText: {
            type: String,
            required: false
        },
        /**
         * icon-class for icon shown left/before headline
         */
        headlineIcon: {
            type: Object,
            required: false
        },
        /**
         * text-alignment
         *
         * @allowedValues: "left", "center", "right"
         */
        textAlign: {
            type: String,
            default: null
        }
    },
    computed: {
        headlineComponentPath() {
            return this.componentPath || ["props", "cmdHeadline"]
        },
        headlineTag() {
            if (this.headlineLevel) {
                return "h" + this.headlineLevel
            }
            return ""
        },
        getTextAlign() {
            if (this.textAlign) {
                return "text-" + this.textAlign
            }
            return ""
        }
    },
    methods: {
        updateHandlerProvider() {
            const headlineText = this.editableHeadlineText
            const preHeadlineText = this.editablePreHeadlineText

            return updateHandlerProvider(this, {
                update(props) {
                    props.headlineText = headlineText
                    props.preHeadlineText = preHeadlineText
                }
            })
        }
    },
    watch: {
        headlineText: {
            handler() {
                this.editableHeadlineText = this.headlineText
            },
            immediate: true
        },
        preHeadlineText: {
            handler() {
                this.editablePreHeadlineText = this.preHeadlineText
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-headline ------------------------------------------------------------------------------------------ */
//@import '../assets/styles/variables';

.cmd-headline {
    margin-bottom: var(--default-margin);
    gap: calc(var(--default-gap) / 2);

    &.text-center > * {
        text-align: center;
    }

    &.text-right > * {
        text-align: right;
    }

    &.has-icon {
        display: flex;
        align-items: center;
    }

    &.has-pre-headline-text {
        text-align: inherit;

        [class*="icon-"] {
            font-size: 5rem;
        }
    }

    p {
        margin-bottom: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;

        &:only-child {
            flex: none;
            width: 100%;
        }
    }

    //@media only screen and (max-width: $small-max-width) {
    //    flex-direction: column;
    //
    //    h1 {
    //        margin-bottom: calc(var(--default-margin) * 2);
    //    }
    //}
}

.edit-mode label.headline {
    input {
        padding: 0;
        height: auto;
    }

    &.h1 input {
        font-size: var(--headline-font-size-h1);
        text-transform: var(--headline-text-transform);
    }

    &.h2 input {
        font-size: var(--headline-font-size-h2);
    }

    &.h3 input {
        font-size: var(--headline-font-size-h3);
    }

    &.h4 input {
        font-size: var(--headline-font-size-h4);
    }

    &.h5 input {
        font-size: var(--headline-font-size-h5);
    }

    &.h6 input {
        font-size: var(--headline-font-size-h6);
    }
}

/* end cmd-headline ------------------------------------------------------------------------------------------ */
</style>
