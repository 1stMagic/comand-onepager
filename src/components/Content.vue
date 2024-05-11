<template>
    <div :class="['cmd-content flex-container', {'reverse': alignImage === 'right'}]">
        <!-- begin edit-mode -->
        <template v-if="editMode">
            <!-- begin show component-wrapper with components inside (if exist) -->
            <template v-if="components.length > 0">
                <!-- begin first-level component -->
                <EditComponentWrapper
                    v-for="(component, componentIndex) in components"
                    :key="componentIndex"
                    :allowAddComponent="allowAddComponent"
                    :componentName="component.name"
                    :componentProps="component.props"
                    :componentPath="componentPath(componentIndex)">
                    <component :is="component.name" v-bind="component.props" :componentPath="['props']">
                        <!-- begin child/nested component -->
                        <EditComponentWrapper
                            v-for="(childComponent, childComponentIndex) in component.components || []"
                            :key="childComponentIndex"
                            :allowAddComponent="component.allowAddComponent"
                            :componentName="childComponent.name"
                            :componentProps="childComponent.props"
                            :componentPath="childComponentPath(childComponentIndex)"
                        >
                            <component :is="childComponent.name" v-bind="childComponent.props"/>
                        </EditComponentWrapper>
                        <!-- end child/nested component -->
                    </component>
                </EditComponentWrapper>
                <!-- end first-level component -->
            </template>
            <!-- end show component-wrapper with components inside (if exist) -->

            <!-- begin show add-new-component-button if no component exists -->
            <div class="center-content" v-else>
                <a href="#" @click.prevent="openSidebar" class="button confirm">
                    <span class="icon-plus"></span>
                    <span>Add new component</span>
                </a>
            </div>
            <!-- end show add-new-component-button if no component exists -->
        </template>
        <!-- end edit-mode -->

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
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia.js"

export default {
    name: "Content",
    inject: {
        editModeContext: {
            default: false
        }
    },
    data() {
        return {
            savedHtmlHeadline: null,
            savedHtmlContent: null,
            savedHtmlContentTop: null,
            savedHtmlContentBottom: null,
            savedImgAltText: null,
            savedImgFigcaption: null,
            showComponentSelection: false
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
        },
        allowAddComponent: {
            type: Boolean
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
        ...mapActions(usePiniaStore, ["addContent"]),
        openSidebar() {
            const componentPath = ["main", "sections", {id: this.sectionId}, "components", -1]

            this.editModeContext.settings.startEditing(
                JSON.stringify(componentPath),
                "section",
                {addComponent: true},
                null,
                componentPath,
                null,
                null,
                1
            )
        },
        componentPath(componentIndex) {
            return [
                "main",
                "sections",
                {id: this.sectionId},
                "components",
                componentIndex
            ]
        },
        childComponentPath(componentIndex) {
            return [
                "components",
                componentIndex
            ]
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
