<template>
    <component
            :is="componentTag || 'div'"
            :class="['edit-component-wrapper', {active}]"
            tabindex="0"
            @click="showActionButtons"
            ref="editComponent"
            :title="!active ? 'Click to select this element' : 'Select an action from the buttons in the top-left corner'"
            :data-identifier="componentIdentifier">
        <li v-if="componentTag === 'ul'" class="action-buttons-wrapper">
            <!-- begin action-buttons -->
            <ul v-show="active" class="flex-container no-flex action-buttons">
                <li>
                    <a :class="['icon-hexagon', {disabled: !addHandlerProvider && !allowAddComponent}]"
                       href="#"
                       @click.prevent="addEntry"
                       title="Add a new entry">
                        <CmdIcon iconClass="icon-plus"/>
                    </a>
                    <template v-if="showAddComponentButtons">
                        <a class="icon-hexagon"
                           href="#"
                           @click.prevent="addInnerComponent"
                           title="Add a new entry inside of this component">
                            <CmdIcon iconClass="icon-home"/>
                        </a>
                        <a class="icon-hexagon"
                           href="#"
                           @click.prevent="addSectionComponent"
                           title="Add a new entry at same section-level as this component">
                            <CmdIcon iconClass="icon-globe"/>
                        </a>
                    </template>
                </li>
                <li>
                    <a v-if="editing"
                       class="icon-hexagon button-save" href="#"
                       @click.prevent="saveComponent"
                       title="Save changes of this component">
                        <CmdIcon iconClass="icon-check"/>
                    </a>
                    <a v-else
                       :class="['icon-hexagon', {disabled: editModeContext.settings.isEditing(componentIdentifier)}]"
                       href="#"
                       @click.prevent="editComponent"
                       title="Edit content of this component">
                        <CmdIcon iconClass="icon-edit"/>
                    </a>
                </li>
                <li>
                    <a class="icon-hexagon button-delete"
                       href="#"
                       @click.prevent="deleteComponent"
                       title="Delete this component (and its content)">
                        <CmdIcon iconClass="icon-trash"/>
                    </a>
                </li>
                <li>
                    <a :class="['icon-hexagon', {disabled: editing || !hasSettings}]"
                       :href="editing ? null : '#'"
                       @click.prevent="editSettings"
                       title="Edit settings of this component">
                        <CmdIcon iconClass="icon-cog"/>
                    </a>
                </li>
                <li>
                    <a :class="['icon-hexagon button-cancel', {disabled: !editing}]"
                       href="#"
                       @click.prevent="cancelComponent"
                       title="Cancel editing (changes will not be saved)">
                        <CmdIcon iconClass="icon-cancel"/>
                    </a>
                </li>
            </ul>
            <!-- end action buttons -->
        </li>
        <template v-else>
            <!-- begin show component name above wrapper -->
            <small v-if="!allowAddComponent && active && showComponentName" class="component-name">{{
                    componentName
                }}</small>
            <!-- end show component name above wrapper -->

            <!-- begin action-buttons -->
            <ul v-show="active" class="flex-container no-flex action-buttons">
                <li>
                    <a :class="['icon-hexagon', {disabled: !addHandlerProvider && !itemProvider && !allowAddComponent}]"
                       href="#"
                       @click.prevent="addEntry"
                       title="Add a new entry">
                        <CmdIcon iconClass="icon-plus"/>
                    </a>
                    <template v-if="showAddComponentButtons">
                        <a class="icon-hexagon"
                           href="#"
                           @click.prevent="addInnerComponent"
                           title="Add a new entry inside of this component">
                            <CmdIcon iconClass="icon-home"/>
                        </a>
                        <a class="icon-hexagon"
                           href="#"
                           @click.prevent="addSectionComponent"
                           title="Add a new entry at same section-level as this component">
                            <CmdIcon iconClass="icon-globe"/>
                        </a>
                    </template>
                </li>
                <li>
                    <a v-if="editing"
                       class="icon-hexagon button-save" href="#"
                       @click.prevent="saveComponent"
                       title="Save changes of this component">
                        <CmdIcon iconClass="icon-check"/>
                    </a>
                    <a v-else
                       :class="['icon-hexagon', {disabled: editModeContext.settings.isEditing(componentIdentifier)}]"
                       href="#"
                       @click.prevent="editComponent"
                       title="Edit content of this component">
                        <CmdIcon iconClass="icon-edit"/>
                    </a>
                </li>
                <li>
                    <a class="icon-hexagon button-delete"
                       href="#"
                       @click.prevent="deleteComponent"
                       title="Delete this component (and its content)">
                        <CmdIcon iconClass="icon-trash"/>
                    </a>
                </li>
                <li>
                    <a :class="['icon-hexagon', {disabled: editing || !hasSettings}]"
                       :href="editing ? null : '#'"
                       @click.prevent="editSettings"
                       title="Edit settings of this component">
                        <CmdIcon iconClass="icon-cog"/>
                    </a>
                </li>
                <li>
                    <a :class="['icon-hexagon button-cancel', {disabled: !editing}]"
                       href="#"
                       @click.prevent="cancelComponent"
                       title="Cancel editing (changes will not be saved)">
                        <CmdIcon iconClass="icon-cancel"/>
                    </a>
                </li>
            </ul>
            <!-- end action buttons -->
        </template>
        <!-- begin slot -->
        <slot></slot>
        <!-- end slot -->
    </component>
</template>

<script>
import componentStructure from "../../assets/data/component-structure.json"

import {mapState} from "pinia"
import {usePiniaStore} from "../../stores/pinia.js"
import {componentPathAsString, findEditComponentWrapper} from "../../utils/editmode.js"
import {getCurrentInstance} from "vue"

export default {
    name: "EditComponentWrapper",
    inject: {
        editModeContext: {}
    },
    props: {
        allowedComponentTypes: {
          type: Array
        },
        componentName: {
            type: String
        },
        componentProps: {
            type: Object
        },
        componentPath: {
            type: Array,
            required: true
        },
        allowAddComponent: {
            type: Boolean
        },
        showComponentName: {
            type: Boolean,
            default: true
        },
        componentTag: {
            type: String
        },
        itemProvider: {
            type: Function
        }
    },
    data() {
        return {
            componentIdentifier: "",
            editStateListeners: [],
            updateHandlerProviders: [],
            addHandlerProvider: null,
            showComponentSelection: false,
            showAddComponentButtons: false,
            addComponentLevel: ""
        }
    },
    computed: {
        // provide states from store as computed-properties inside this component
        ...mapState(usePiniaStore, ["updateContent", "updateSettings", "deleteContent", "addContent"]),
        active() {
            // return !!this.editModeContext.system.isActiveComponent(this.componentIdentifier)
            return !!this.editModeContext.system.isActiveComponent(buildComponentPath(this))
        },
        editing() {
            return this.editModeContext.content.isEditing(this.componentIdentifier)
        },
        hasSettings() {
            const settingsComponentName = `${this.componentName}Settings`
            return !!getCurrentInstance().appContext.components[settingsComponentName]
        }
    },
    methods: {
        componentSelected(event) {
            const selectedComponent = event.target.value

            if (this.addComponentLevel === "after") {
                this.addContent(buildComponentPath(this), {
                    name: selectedComponent,
                    item() {
                        return componentStructure[selectedComponent]
                    }
                })
            } else {
                const path = buildComponentPath(this)
                path.push("components")
                path.push(-1)

                this.addContent(path, {
                    name: selectedComponent,
                    item() {
                        return componentStructure[selectedComponent]
                    }
                })
            }

            this.showComponentSelection = false
            this.showAddComponentButtons = false
            this.addComponentLevel = ""
        },
        addEntry() {
            if (this.allowAddComponent) {
                // check if component can contain other components
                if (componentStructure[this.componentName]?.components) {
                    this.showAddComponentButtons = true
                } else {
                    this.showComponentSelection = true
                    this.addComponentLevel = "after"
                }
            } else if (this.addHandlerProvider) {
                this.addContent(buildComponentPath(this), this.addHandlerProvider())
            } else if (this.itemProvider) {
                this.editModeContext.content.addContent(buildComponentPath(this), this.itemProvider)
            }
            this.$emit("item-added")
        },
        addInnerComponent() {
            this.addComponentLevel = "inner"
            this.showComponentSelection = true
        },
        addSectionComponent() {
            this.addComponentLevel = "after"
            this.showComponentSelection = true
        },
        // provide actions from store as methods inside this component
        showActionButtons() {
            // console.log("this.componentIdentifier", this.componentIdentifier)
            // this.editModeContext.system.setActiveComponent(this.componentIdentifier)
            this.editModeContext.system.setActiveComponent(buildComponentPath(this))
        },
        deleteComponent() {
            if (confirm("Delete this component and its content?")) {
                this.deleteContent(buildComponentPath(this))

                // close settings sidebar if component is deleted
                this.editModeContext.settings.stopEditing()
            }
        },
        cancelComponent(event) {
            if (this.editing) {
                event.stopPropagation()
                this.editModeContext.content.stopEditing()
            }
        },
        editComponent(event) {
            event.stopPropagation()
            const component = this.$refs.editComponent
            this.editModeContext.content.startEditing(this.componentIdentifier)
            // wait until input in inserted into DOM on next tick
            this.$nextTick(() => component.querySelector("input")?.focus())
        },
        saveComponent() {
            this.updateContent(
                buildComponentPath(this),
                this.updateHandlerProviders.map(provider => provider()))
            this.editModeContext.content.stopEditing()
        },
        editSettings(event) {
            event.stopPropagation()

            if(!this.editing && this.hasSettings) {
                this.editModeContext.settings.startEditing(
                    this.componentIdentifier,
                    this.componentName,
                    this.componentProps,
                    this.componentProps,
                    this.allowedComponentTypes,
                    buildComponentPath(this),
                    this.saveSettings
                )
            }
        },
        saveSettings(updateCallback) {
            this.updateSettings(
                buildComponentPath(this),
                updateCallback)
            this.editModeContext.settings.stopEditing()
        },
        addEditStateListener(listener) {
            this.editStateListeners.push(listener)
            listener(this.editing)
        },
        addUpdateHandlerProvider(updateHandlerProvider) {
            this.updateHandlerProviders.push(updateHandlerProvider)
        },
        setAddHandlerProvider(addHandlerProvider) {
            // assign given function to data-property
            if (addHandlerProvider) {
                this.addHandlerProvider = addHandlerProvider
            }
        }
    },
    watch: {
        componentPath: {
            handler() {
                this.componentIdentifier = componentPathAsString(buildComponentPath(this))
            },
            immediate: true,
            deep: true
        },
        editing(value) {
            this.editStateListeners.forEach(listener => listener(value))
        }
    }
}

function buildComponentPath(component) {
    const path = []
    for (let parent = component; parent; parent = findEditComponentWrapper(parent.$parent)) {
        if (parent.componentPath) {
            path.unshift(...parent.componentPath)
        }
    }
    return path
}
</script>

<style lang="scss">
@mixin edit-border {
    border: .1rem dashed transparent;
    transition: var(--default-transition);

    &:hover, &:active, &:focus, &.active {
        border-color: var(--primary-color);
        background: hsl(0, 0%, 96%);
        transition: var(--default-transition);
    }

    &:focus, &.active {
        border-style: solid;
        border-color: var(--primary-color);

        .action-buttons {
            opacity: 1;
            transition: var(--default-transition);
        }
    }
}

.edit-component-wrapper {
    @include edit-border;

    .component-name {
        position: absolute;
        left: 0;
        top: -1.8rem;
        font-style: italic;
    }

    .action-buttons {
        --action-buttons-size: 3.6rem;
        transition: var(--default-transition);
        gap: 0;

        position: absolute;
        top: calc(var(--action-buttons-size) / -1.9);
        right: 0;
        z-index: 1;

        margin: 0;

        li {
            a {
                font-size: var(--action-buttons-size);

                &.button-save {
                    color: var(--success-color);
                }

                &.button-cancel {
                    color: var(--error-color)
                }

                &.button-delete {
                    color: var(--pure-black);
                }

                [class*="icon-"] {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 2;
                    transform: translate(-50%, -50%);
                    color: var(--pure-white);
                }

                &.disabled {
                    color: var(--disabled-background-color) !important;
                }
            }

            &:nth-child(odd) {
                top: calc(var(--action-buttons-size) / 2.2);
            }

            &:nth-child(4) {
                right: calc(var(--action-buttons-size) / -4);
            }

            &:nth-child(3) {
                right: calc(var(--action-buttons-size) / -2);
            }

            &:nth-child(2) {
                right: calc(var(--action-buttons-size) / -1.333);
            }

            &:nth-child(1) {
                right: calc(var(--action-buttons-size) / -1);
            }
        }
    }

    .edit-items {
        .action-buttons {
            top: -1.5rem;
            gap: calc(var(--default-gap) / 2);
            flex-wrap: nowrap;

            li {
                top: 0;
                right: 0;

                a {
                    font-size: 1rem;
                    display: block;

                    &:before {
                        content: ""
                    }

                    span[class*="icon-"] {
                        position: relative;
                        color: var(--hyperlink-color);
                        top: 0;
                        left: 0;
                        transform: none;
                    }

                    &:hover, &:active, &:focus {
                        span[class*="icon-"] {
                            color: var(--hyperlink-color-highlighted);
                        }
                    }
                }
            }
        }

        &.active {
            background: var(--pure-white);
        }
    }
}

ul.edit-component-wrapper {
    border: 0;

    > li {
        list-style-type: none;
        margin: 0;

        &.action-buttons-wrapper {
            display: flex;
            justify-content: flex-end;
            padding-top: .1rem;

            .action-buttons {
                position: relative;
                top: auto;
            }
        }

        &.item-wrapper {
            @include edit-border;
        }
    }

}

</style>
