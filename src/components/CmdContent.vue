<template>
    <div :class="['cmd-content flex-container', {'reverse': alignImage === 'right'}]">
        <EditComponentWrapper v-for="(component, componentIndex) in components" :key="componentIndex"
                              :componentIdentifier="`${sectionId}.${componentIndex}`">
            <component
                    :is="component.name"
                    v-bind="component.props"
                    :editModeContextData="{componentIndex: componentIndex}"
            >
                <EditComponentWrapper
                        v-for="(childComponent, childComponentIndex) in component.components || []"
                        :key="childComponentIndex" :is="childComponent.name"
                        :componentIdentifier="`${sectionId}.${componentIndex}.${childComponentIndex}`"
                >
                    <component
                            v-bind="childComponent.props"
                            :editModeContextData="{parentComponentIndex: componentIndex, componentIndex: childComponentIndex}"
                    />
                </EditComponentWrapper>
            </component>
        </EditComponentWrapper>
    </div>
</template>

<script>
import EditComponentWrapper from "./editmode/EditComponentWrapper.vue"

export default {
    name: "CmdContent",
    components: {EditComponentWrapper},
    data() {
        return {
            savedHtmlHeadline: null,
            savedHtmlContent: null,
            savedHtmlContentTop: null,
            savedHtmlContentBottom: null,
            savedImgAltText: null,
            savedImgFigcaption: null
        }
    },
    props: {
        sectionId: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: false
        },
        alignImage: {
            type: String,
            default: "left"
        },
        htmlHeadline: {
            type: String,
            required: false
        },
        htmlContent: {
            type: String,
            required: false
        },
        htmlContentTop: {
            type: String,
            required: false
        },
        htmlContentBottom: {
            type: String,
            required: false
        },
        cmdHeadline: {
            type: Object,
            required: false
        },
        cmdSlideButtons: {
            type: Object,
            required: false
        },
        components: {
            type: Array,
            required: true
        }
    },
    computed: {
        editableHtmlHeadline: {
            get() {
                return this.savedHtmlHeadline || this.htmlHeadline
            },
            set(value) {
                this.savedHtmlHeadline = value
            }
        },
        editableHtmlContent: {
            get() {
                return this.savedHtmlContent || this.htmlContent
            },
            set(value) {
                this.savedHtmlContent = value
            }
        },
        editableHtmlContentTop: {
            get() {
                return this.savedHtmlContentTop || this.htmlContentTop
            },
            set(value) {
                this.savedHtmlContentTop = value
            }
        },
        editableHtmlContentBottom: {
            get() {
                return this.savedHtmlContentBottom || this.htmlContentBottom
            },
            set(value) {
                this.savedHtmlContentBottom = value
            }
        },
        imgAltText: {
            get() {
                return this.savedImgAltText || this.images?.[0].alt
            },
            set(value) {
                this.savedImgAltText = value
            }
        },
        imgFigcaption: {
            get() {
                return this.savedImgFigcaption || this.images?.[0].figcaption
            },
            set(value) {
                this.savedImgFigcaption = value
            }
        }
    }
}
</script>

<style lang="scss">
.cmd-content {
  &.reverse {
    flex-direction: row-reverse;
  }
}
</style>