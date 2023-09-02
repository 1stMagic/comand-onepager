<template>
    <div :class="['cmd-content flex-container', {'reverse': alignImage === 'right'}]">
        <template v-if="editMode">
            <!-- begin show component-wrapper with components inside (if exist) -->
            <template v-if="components.length > 0">
                <EditComponentWrapper
                        v-for="(component, componentIndex) in components"
                        :key="componentIndex"
                        :allowAddComponent="allowAddComponent"
                        :componentName="component.name"
                        :componentProps="component.props"
                        :componentPath="componentPath(componentIndex)">
                    <component
                            :is="component.name"
                            v-bind="component.props"
                    >
                        <EditComponentWrapper
                                v-for="(childComponent, childComponentIndex) in component.components || []"
                                :key="childComponentIndex"
                                :allowAddComponent="component.allowAddComponent"
                                :componentName="childComponent.name"
                                :componentProps="childComponent.props"
                                :componentPath="childComponentPath(childComponentIndex)"
                        >
                            <component
                                    :is="childComponent.name"
                                    v-bind="childComponent.props"
                            />
                        </EditComponentWrapper>
                    </component>
                </EditComponentWrapper>
            </template>
            <!-- end show component-wrapper with components inside (if exist) -->

            <!-- begin show add-new-component-button if no component exists -->
            <div class="center-content" v-else>
                <button class="button" title="Add new component" @click="addNewComponent">
                    <span class="icon-plus"></span>
                </button>
                <select v-if="showComponentSelection" @change="componentSelected">
                    <option value="">Select component to add</option>
                    <option value="CmdContainer">Empty container</option>
                    <option value="CmdAddressData">Address data</option>
                    <option value="CmdHeadline">Headline</option>
                    <option value="CmdImage">Image</option>
                    <option value="CmdImageGallery">Image gallery</option>
                    <option value="CmdListOfLinks">List of links</option>
                    <option value="CmdOpeningHours">Opening hours</option>
                    <option value="CmdSlideshow">Slideshow</option>
                    <option value="CmdSocialNetworks">Social networks</option>
                    <option value="CmdTextImageBlock">Text-Image-Block</option>
                    <option value="CmdThumbnailScroller">Thumbnail-Scroller</option>
                    <option value="CmdToggleDarkMode">Toggle Dark-Mode</option>
                </select>
            </div>
            <!-- end show add-new-component-button if no component exists -->
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
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia.js"
import componentStructure from "../assets/data/component-structure.json"

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
        addNewComponent() {
            this.showComponentSelection = !this.showComponentSelection
        },
        componentSelected(event) {
            const selectedComponent = event.target.value

            this.addContent(this.componentPath(-1), {
                name: selectedComponent,
                item() {
                    return componentStructure[selectedComponent]
                }
            })

            this.showComponentSelection = false
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
