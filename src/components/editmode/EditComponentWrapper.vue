<template>
    <div
        :class="['edit-component-wrapper', {active}]"
        tabindex="0"
        @click="showActionButtons"
        :data-identifier="componentIdentifier">

        <!-- begin action-buttons -->
        <small v-show="active" class="component-name">{{ componentName }}</small>
        <ul v-show="active" class="flex-container no-flex no-gap action-buttons">
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
                <a :class="['icon-hexagon', {disabled: editing}]"
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

        <!-- begin slot -->
        <slot></slot>
        <!-- end slot -->
    </div>
</template>

<script>
import {mapState} from "pinia"
import {usePiniaStore} from "../../stores/pinia.js"
import {componentPathAsString, findEditComponentWrapper} from "../../utils/editmode.js"

export default {
    name: "EditComponentWrapper",
    inject: {
        editModeContext: {}
    },
    props: {
        componentName: {
            type: String
        },
        componentProps: {
            type: Object
        },
        componentPath: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            componentIdentifier: "",
            editStateListeners: [],
            updateHandlerProviders: []
        }
    },
    computed: {
        // provide states from store as computed-properties inside this component
        ...mapState(usePiniaStore, ["updateContent", "updateSettings"]),
        active() {
            return !!this.editModeContext.system.isActiveComponent(this.componentIdentifier)
        },
        editing() {
            return this.editModeContext.content.isEditing(this.componentIdentifier)
        }
    },
    methods: {
        // provide actions from store as methods inside this component
        showActionButtons(event) {
            event.stopPropagation()
            this.editModeContext.system.setActiveComponent(this.componentIdentifier)
        },
        deleteComponent() {
            if (confirm("Delete this component and its content?")) {
                // this.editModeContext.deleteComponent()
                this.$emit("delete")
            }
        },
        addComponent() {
            alert("Add component")
        },
        cancelComponent(event) {
            if (this.editing) {
                event.stopPropagation()
                this.editModeContext.content.stopEditing()
            }
        },
        editComponent(event) {
            event.stopPropagation()
            this.editModeContext.content.startEditing(this.componentIdentifier)
        },
        saveComponent() {
            this.updateContent(
                buildComponentPath(this),
                this.updateHandlerProviders.map(provider => provider()))
            this.editModeContext.content.stopEditing()
        },
        editSettings(event) {
            event.stopPropagation()
            this.editModeContext.settings.startEditing(
                this.componentIdentifier,
                this.componentName,
                this.componentProps,
                this.saveSettings
            )
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
        path.unshift(...parent.componentPath)
    }
    return path
}
</script>

<style lang="scss">
.edit-component-wrapper {
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

    .component-name {
        position: absolute;
        left: 0;
        top: -1.8rem;
        font-style: italic;
    }

    .action-buttons {
        --action-buttons-size: 3.6rem;
        transition: var(--default-transition);

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
}

</style>
