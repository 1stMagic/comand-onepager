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
                            :value="componentName"
                            @change="switchComponent"
                    />
                    <!-- end selection of allowed components to switch component type -->
                    <template v-if="componentProps">
                        <hr/>
                        <div class="list-of-components flex-container vertical">
                            <component ref="settings" :is="settingsComponentName" v-bind="componentProps"/>
                        </div>
                    </template>
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
                            :value="addedComponentName"
                            @change="switchComponent"
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
            </template>
        </CmdTabs>
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
    </aside>
</template>

<script>
import componentStructure from "../../../assets/data/component-structure.json";

export default {
    name: "EditModeComponentSettingsWrapper.vue",
    inject: ["editModeContext"],
    data() {
        return {
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
                },
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
        switchComponent(event) {
            if (confirm("All content for this component will be deleted. Switch to new component anyway?")) {
                const selectedComponent = event.target.value
                this.addContent(buildComponentPath(this), {
                    name: selectedComponent,
                    item() {
                        return componentStructure[selectedComponent]
                    }
                })
                this.deleteContent(buildComponentPath(this))
            } else {
                event.target.value = this.componentName
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
