<template>
    <aside class="edit-mode-component-settings-wrapper flex-container vertical box">
        <CmdTabs
                :stretchTabs="true"
                :tabs="[{name: 'Settings', iconClass: 'icon-cog'}, {name: 'Add Component', iconClass: 'icon-plus'}]"
                :useSlot="true"
        >
            <template v-slot:tab-content-0>
                <div>
                    <h3>Component Settings</h3>
                    <!-- begin selection of allowed components to switch component type -->
                    <CmdFormElement
                        element="select"
                        labelText="Component type"
                        :selectOptions="listOfValidComponents"
                        v-model="currentComponentName"
                        @update:modelValue="switchComponent"
                    />
                    <!-- end selection of allowed components to switch component type -->
                    <template v-if="componentProps">
                        <hr/>
                        <div class="list-of-components flex-container vertical">
                            <component ref="settings" :is="settingsComponentName" v-bind="componentProps"/>
                        </div>
                    </template>
                </div>
                <div class="button-wrapper">
                    <button class="button confirm" @click="saveSettings">
                        <span class="icon-check"></span>
                        <span>Save</span>
                    </button>
                    <button class="button cancel" @click="cancelSettings">
                        <span class="icon-cancel"></span>
                        <span>Cancel</span>
                    </button>
                </div>
            </template>
            <template v-slot:tab-content-1>
                <h3>Add new component</h3>
                <div class="flex-container vertical">
                    <!-- begin selection of allowed components to add additional component -->
                    <CmdFormElement
                            element="select"
                            labelText="Select component to insert"
                            :selectOptions="listOfValidComponents"
                            v-model="addedComponentName"
                    />
                    <!-- end selection of allowed components to add additional component -->

                    <CmdFormElement
                            element="select"
                            labelText="Select inserted component position"
                            :selectOptions="availableComponentPositions"
                            v-model="addedComponentPosition"
                            @change="switchComponent"
                    />
                </div>
                <div class="button-wrapper">
                    <button class="button confirm" @click="addComponent">
                        <span class="icon-check"></span>
                        <span>Save</span>
                    </button>
                    <button class="button cancel" @click="cancelAddComponent">
                        <span class="icon-cancel"></span>
                        <span>Cancel</span>
                    </button>
                </div>
            </template>
        </CmdTabs>
    </aside>
</template>

<script>
import componentStructure from "../../../assets/data/component-structure.json"

export default {
    name: "EditModeComponentSettingsWrapper.vue",
    inject: ["editModeContext"],
    data() {
        return {
            currentComponentName: "",
            addedComponentName: "",
            addedComponentPosition: "after",
            availableComponentPositions: [
                {
                    text: "Before existing component",
                    value: "before"
                },
                {
                    text: "After existing component",
                    value: "after"
                }
            ],
            listOfValidComponents: [
                {
                    text: "Empty Container",
                    value: "CmdContainer"
                },
                {
                    text: "Address Data",
                    value: "CmdAddressData"
                },
                {
                    text: "Headline",
                    value: "CmdHeadline"
                },
                {
                    text: "Image",
                    value: "CmdImage"
                },
                {
                    text: "Image Gallery",
                    value: "CmdImageGallery"
                },
                {
                    text: "List of links",
                    value: "CmdListOfLinks"
                },
                {
                    text: "Opening Hours",
                    value: "CmdOpeningHours"
                },
                {
                    text: "Slideshow",
                    value: "CmdSlideshow"
                },
                {
                    text: "Social Networks",
                    value: "CmdSocialNetworks"
                },
                {
                    text: "Text-Image-Block",
                    value: "CmdTextImageBlock"
                },
                {
                    text: "Thumbnail-Scroller",
                    value: "CmdThumbnailScroller"
                },
                {
                    text: "Toggle Dark-Mode",
                    value: "CmdToggleDarkMode"
                }
            ]
        }
    },
    computed: {
        componentName() {
            return this.editModeContext.settings.getComponentName()
        },
        componentProps() {
            return this.editModeContext.settings.getComponentProps()
        },
        settingsComponentName() {
            return this.editModeContext.settings.getSettingsComponentName()
        }
    },
    methods: {
        switchComponent(selectedComponent) {
            if (confirm("All content for this component will be deleted. Switch to new component anyway?")) {
                // add new/selected component and delete existing one if switch is confirmed (and update settings)
                this.editModeContext.content.addContent(this.editModeContext.settings.getComponentPath(), () => componentStructure[selectedComponent])
                this.editModeContext.content.deleteContent(this.editModeContext.settings.getComponentPath())
                this.editModeContext.settings.updateEditing(selectedComponent, componentStructure[selectedComponent].props)
            } else {
                this.$nextTick(() => this.currentComponentName = this.componentName)
            }
        },
        cancelSettings() {
            if (confirm('Are you sure your want to cancel? (changes will not be saved)')) {
                this.editModeContext.settings.stopEditing()
            }
        },
        saveSettings() {
            const saveHandler = this.editModeContext.settings.getSettingsSaveHandler()
            saveHandler(this.$refs.settings.updateCallbackProvider())
            this.editModeContext.settings.stopEditing()
        },
        addComponent() {
            this.editModeContext.content.addContent(this.editModeContext.settings.getComponentPath(), () => componentStructure[this.addedComponentName], this.addedComponentPosition)
        },
        cancelAddComponent() {
            if (confirm('Are you sure your want to cancel? (changes will not be saved)')) {
                this.editModeContext.settings.stopEditing()
            }
        }
    },
    watch: {
        componentName: {
            handler() {
                this.currentComponentName = this.componentName
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
.edit-mode-component-settings-wrapper {
    width: 30rem;
    justify-content: space-between;
    padding: 0;
    background: var(--default-background);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    height: 100vh;

    h3 {
        text-align: center;
    }

    .button-wrapper > * {
        flex: 1;
    }

    input:not(.toggle-switch), select, textarea, .input {
        --input-height: 3rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
    }

    .list-of-components {
        gap: 0;
    }

    .cmd-box {
        .component-settings-wrapper {
            padding: var(--default-padding);
        }
    }
}
</style>
