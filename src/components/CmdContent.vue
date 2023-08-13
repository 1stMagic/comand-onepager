<template>
    <div :class="['cmd-content flex-container', {'reverse': alignImage === 'right'}]">
        <template v-if="editMode">
            <EditComponentWrapper v-for="(component, componentIndex) in components"
                                  :key="componentIndex"
                                  :componentName="component.name"
                                  :componentProps="component.props"
                                  :componentIdentifier="`${sectionId}.${componentIndex}`"
                                  :componentFinder="componentFinder(sectionId, componentIndex)">
                <component
                        :is="component.name"
                        v-bind="component.props"
                >
                    <EditComponentWrapper
                            v-for="(childComponent, childComponentIndex) in component.components || []"
                            :key="childComponentIndex"
                            :componentName="childComponent.name"
                            :componentProps="childComponent.props"
                            :componentIdentifier="`${sectionId}.${componentIndex}.${childComponentIndex}`"
                            :componentFinder="componentFinder(sectionId, componentIndex, childComponentIndex)"
                    >
                        <component
                                :is="childComponent.name"
                                v-bind="childComponent.props"
                        />
                    </EditComponentWrapper>
                </component>
            </EditComponentWrapper>

        </template>

        <!-- begin default view -->
        <template v-else>
            <component
                    v-for="(component, componentIndex) in components"
                    :key="componentIndex"
                    :is="component.name"
                    v-bind="component.props"
            >
                <component
                    v-for="(childComponent, childComponentIndex) in component.components || []"
                    :is="childComponent.name"
                    :key="childComponentIndex"
                    v-bind="childComponent.props"
                />
            </component>
        </template>
        <!-- end default view -->
    </div>
</template>

<script>
import EditComponentWrapper from "./editmode/EditComponentWrapper.vue"
import {mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia.js"

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
        // provide states from store as computed-properties inside this component
        ...mapState(usePiniaStore, {
            editMode: "editMode"
        }),
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
    },
    methods: {
        componentFinder(sectionId, ...componentIndexes) {
            return site => {
                if (componentIndexes.length > 0) {
                    const sections = site?.main?.sections
                    if (sections) {
                        const section = sections.find(section => section.id === sectionId)
                        if (section?.components) {
                            let component = null
                            componentIndexes.forEach(
                                componentIndex => component = getArrayItem(
                                    component,
                                    componentIndex,
                                    getArrayItem(section.components, componentIndex)))
                            return component
                        }
                    }
                }
                return null
            }
        }
    }
}

function getArrayItem(array, index, defaultValue) {
    if (Array.isArray(array) && array.length > index) {
        return array[index]
    }
    return defaultValue
}
</script>

<style lang="scss">
.cmd-content {
    &.reverse {
        flex-direction: row-reverse;
    }
}
</style>
