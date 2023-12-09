<template>
    <aside class="edit-mode-settings-sidebar flex-container vertical box">
        <CmdTabs
            :stretchTabs="true"
            :tabs="tabs"
            :useSlot="true"
            :activeTab="editModeContext.settings.getActiveTab() || 0"
        >
            <!-- begin tab 'component settings' -->
            <template v-slot:tab-content-0>
                <div>
                    <div class="component-settings-wrapper flex-container vertical no-list-item">
                        <template v-if="isComponent">
                            <h3 class="has-icon">
                                <span class="icon-hexagon use-icon-as-background">
                                    <span class="icon-cogs"></span>
                                </span>
                                <span>Component Settings</span>
                            </h3>

                            <!-- begin selection of allowed components to switch component type -->
                            <template v-if="isComponent">
                                <!-- begin components-view-selection -->
                                <ul class="components-view-selection no-list-items">
                                    <li>
                                        <a href="#"
                                           @click.prevent="showComponentsAsIcons = !showComponentsAsIcons"
                                           :title="showComponentsAsIcons ? 'Switch to dropdown-view for components' : 'Switch to icon-view for components'"
                                        >
                                            <CmdIcon
                                                :iconClass="showComponentsAsIcons ? 'icon-list' : 'icon-blocks-small'"
                                            />
                                        </a>
                                    </li>
                                </ul>
                                <!-- end components-view-selection -->

                                <!-- begin select components from icons -->
                                <ul v-if="showComponentsAsIcons" class="components-icon-view">
                                    <li v-for="(component, index) in listOfValidComponents" :key="index">
                                        <a href="#"
                                           @click.prevent="switchComponent"
                                           :class="{ 'active': currentComponentName === component.value}"
                                           title="Select this component">
                                            <span class="icon-hexagon">
                                                <CmdIcon :iconClass="component.iconClass"/>
                                            </span>
                                            <span>{{ component.text }}</span>
                                        </a>
                                    </li>
                                </ul>
                                <!-- end select components from icons -->
                                <!-- begin select components from dropdown -->
                                <CmdFakeSelect
                                    v-else
                                    labelText="Component type"
                                    :required="true"
                                    :selectData="listOfValidComponents"
                                    defaultOptionName="Select component:"
                                    v-model="currentComponentName"
                                    @update:modelValue="switchComponent"
                                />
                                <!-- end select components from dropdown -->
                                <hr />
                            </template>
                            <!-- end selection of allowed components to switch component type -->
                        </template>
                        <h3 v-else class="has-icon">
                            <span class="icon-circle use-icon-as-background">
                                <span class="icon-cog"></span>
                            </span>
                            <span>Item Settings</span>
                        </h3>
                    </div>

                    <!-- begin list of components -->
                    <template v-if="componentProps">
                        <div class="list-of-components flex-container vertical">
                            <component ref="settings" :is="settingsComponentName" v-bind="componentProps"/>
                        </div>
                    </template>
                    <!-- end list of components -->
                </div>
                <div class="button-wrapper action-buttons-wrapper">
                    <button class="button confirm" @click="saveSettings" aria-label="Save settings">
                        <span class="icon-check-circle"></span>
                        <span>Save</span>
                    </button>
                    <button class="button cancel" @click="cancelSettings" aria-label="Cancel settings">
                        <span class="icon-cancel-circle"></span>
                        <span>Cancel</span>
                    </button>
                </div>
            </template>
            <!-- end tab 'component settings' -->

            <!-- begin tab 'add component' (components only) -->
            <template v-if="isComponent" v-slot:tab-content-1>
                <div class="flex-container vertical component-settings-wrapper add-component-tab">
                    <h3 class="has-icon">
                           <span class="icon-hexagon use-icon-as-background">
                                <span class="icon-plus"></span>
                            </span>
                        <span>Add new component</span>
                    </h3>


                    <h4>{{ currentComponentName }}</h4>

                    <!-- begin selection of allowed components to add additional component -->
                    <ul class="components-view-selection no-list-items">
                        <li>
                            <a href="#"
                               @click.prevent="showComponentsAsIcons = !showComponentsAsIcons"
                               :title="showComponentsAsIcons ? 'Switch to dropdown-view for components' : 'Switch to icon-view for components'"
                            >
                                <CmdIcon :iconClass="showComponentsAsIcons ? 'icon-list' : 'icon-blocks-small'"/>
                            </a>
                        </li>
                    </ul>
                    <!-- end selection of allowed components to add additional component -->

                    <!-- begin select components from icons -->
                    <ul v-if="showComponentsAsIcons" class="components-icon-view">
                        <li v-for="(component, index) in listOfValidComponents" :key="index">
                            <a href="#"
                               @click.prevent="selectComponentToAdd(component.value)"
                               :class="{ 'active': addedComponentName === component.value}"
                               title="Select this component">
                                <span class="icon-hexagon">
                                    <CmdIcon :iconClass="component.iconClass"/>
                                </span>
                                <span>{{ component.text }}</span>
                            </a>
                        </li>
                    </ul>
                    <!-- end select components from icons -->

                    <!-- begin select components from dropdown -->
                    <CmdFakeSelect
                        v-else
                        labelText="Select component to insert"
                        :required="true"
                        :selectData="listOfValidComponents"
                        defaultOptionName="Select component:"
                        v-model="addedComponentName"
                    />
                    <!-- end select components from dropdown -->
                    <hr />
                    <!-- end selection of allowed components to add additional component -->

                    <h4>Positioning</h4>
                    <!--
                    <a class="icon-hexagon button confirm"
                       href="#"
                       @click.prevent="addInnerComponent"
                       title="Add a new entry inside of this component">
                        <CmdIcon iconClass="icon-home"/>
                    </a>
                    <a class="icon-hexagon button confirm"
                       href="#"
                       @click.prevent="addSectionComponent"
                       title="Add a new entry at same section-level as this component">
                        <CmdIcon iconClass="icon-globe"/>
                    </a>
                    -->

                    <!-- begin selection of available positions for added component -->
                    <CmdFakeSelect
                        labelText="Select inserted component position"
                        :required="true"
                        :selectData="availableComponentPositions"
                        defaultOptionName="Select component:"
                        v-model="addedComponentPosition"
                    />
                    <!-- end selection of available positions for added component -->
                </div>
                <div class="button-wrapper stretch-buttons action-buttons-wrapper">
                    <button class="button confirm" @click="addComponent" aria-label="Add selected component">
                        <span class="icon-check-circle"></span>
                        <span>Add</span>
                    </button>
                    <button class="button cancel" @click="cancelAddComponent" aria-label="Cancel adding selected component">
                        <span class="icon-cancel-circle"></span>
                        <span>Cancel</span>
                    </button>
                </div>
            </template>
            <!-- end tab 'add component' (components only) -->
        </CmdTabs>
    </aside>
</template>

<script>
// import data
import componentStructure from "../../../assets/data/component-structure.json"

export default {
    name: "EditModeSettingsSidebar",
    inject: ["editModeContext"],
    data() {
        return {
            showComponentsAsIcons: false,
            currentComponentName: "",
            addedComponentName: "CmdContainer",
            addedComponentPosition: "after",
            availableComponentPositions: [
                {
                    text: "Before existing component",
                    value: "before",
                    iconClass: "icon-arrow-up"
                },
                {
                    text: "After existing component",
                    value: "after",
                    iconClass: "icon-arrow-down"
                }
            ],
            listOfValidComponents: [
                {
                    text: "Empty Container",
                    value: "CmdContainer",
                    iconClass: "icon-square-outline"
                },
                {
                    text: "Address Data",
                    value: "CmdAddressData",
                    iconClass: "icon-mail"
                },
                {
                    text: "Headline",
                    value: "CmdHeadline",
                    iconClass: "icon-square"
                },
                {
                    text: "Image",
                    value: "CmdImage",
                    iconClass: "icon-image"
                },
                {
                    text: "Image Gallery",
                    value: "CmdImageGallery",
                    iconClass: "icon-square"
                },
                {
                    text: "List of links",
                    value: "CmdListOfLinks",
                    iconClass: "icon-list"
                },
                {
                    text: "Opening Hours",
                    value: "CmdOpeningHours",
                    iconClass: "icon-clock"
                },
                {
                    text: "Slideshow",
                    value: "CmdSlideshow",
                    iconClass: "icon-square"
                },
                {
                    text: "Social Networks",
                    value: "CmdSocialNetworks",
                    iconClass: "icon-square"
                },
                {
                    text: "Text-Image-Block",
                    value: "CmdTextImageBlock",
                    iconClass: "icon-square"
                },
                {
                    text: "Thumbnail-Scroller",
                    value: "CmdThumbnailScroller",
                    iconClass: "icon-square"
                },
                {
                    text: "Toggle Dark-Mode",
                    value: "CmdToggleDarkMode",
                    iconClass: "icon-square"
                }
            ]
        }
    },
    computed: {
        tabs() {
            const tabs = [{name: 'Settings', iconClass: 'icon-cog'}]

            // show second tab (to add component) is settings belong to component (and not item)
            if (this.isComponent) {
                tabs.push({name: 'Add Component', iconClass: 'icon-plus'})
            }

            return tabs
        },
        componentName() {
            return this.editModeContext.settings.getComponentName()
        },
        componentProps() {
            return this.editModeContext.settings.getComponentProps()
        },
        settingsComponentName() {
            return this.editModeContext.settings.getSettingsComponentName()
        },
        isComponent() {
            return !this.editModeContext.settings.getAllowedContentTypes() || this.editModeContext.settings.getAllowedContentTypes().length > 0;

        }
    },
    methods: {
        selectComponentToAdd(selectedComponent) {
            this.addedComponentName = selectedComponent
        },
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
            this.editModeContext.settings.stopEditing()
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
        },
        addedComponentPosition() {
            this.switchComponent(this.addedComponentPosition)
        }
    }
}
</script>

<style lang="scss">
.edit-mode-settings-sidebar {
    width: 30rem;
    justify-content: space-between;
    padding: 0;
    background: var(--default-background);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;
    height: 100vh;

    h3 {
        justify-content: center;

        > span {
            font-size: 2.2rem;

            &[class*="icon"] {
                &::before {
                    font-size: 2.2rem;
                }

                [class*="icon"] {
                    &::before {
                        font-size: 1rem;
                        line-height: 200%; /* fixes vertical position */
                    }
                }
            }
        }
    }

    .action-buttons-wrapper > * {
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

    .cmd-tabs, .cmd-tabs > div {
        height: 100%;
    }

    .cmd-tabs, .cmd-tabs > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .cmd-tabs > div {
        padding: 0;
    }

    .cmd-tabs {
        .action-buttons-wrapper, .component-settings-wrapper {
            padding: var(--default-padding);
        }
    }

    .components-view-selection {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    .component-settings-wrapper {
        .cmd-fake-select {
            width: 100%;
        }

        > h3:first-child {
            .use-icon-as-background {
                &::before, & + span {
                    color: var(--primary-color);
                }
            }
        }

        &.add-component-tab {
            > h3:first-child {
                .use-icon-as-background {
                    &::before, & + span {
                        color: var(--success-color);
                    }
                }
            }
        }
    }

    .no-image {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--default-gap) / 2);
        padding: var(--default-padding);
        border: var(--default-border);

        [class*="icon"] {
            font-size: 3rem;
        }
    }

    .components-icon-view {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 1.5rem 0;

        li {
            border: var(--default-border);
            border-color: transparent;
            list-style-type: none;
            margin-left: 0;

            a {
                display: flex;
                flex-direction: column;
                gap: var(--default-gap-half);
                align-items: center;
                text-align: center;
                font-size: small;
                text-decoration: none;

                > span[class*="icon"] {
                    font-size: 5rem;
                }

                span {
                    margin: 0;

                    [class*="icon"] {
                        font-size: var(--icon-size-large);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        z-index: 2;
                        transform: translate(-50%, -50%);
                        color: var(--pure-white);
                    }
                }

                &:hover, &:active, &:focus {
                    span:not([class*="icon"]) {
                        text-decoration: underline;
                    }
                }

                &.active:not([class*="icon-"]) {
                    background: none;
                    padding: 0;
                }
            }
        }
    }
}
</style>
