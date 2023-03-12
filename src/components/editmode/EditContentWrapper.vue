<template>
    <div class="edit-mode">
        <template v-if="componentExists">
            <!-- begin action-buttons -->
            <ul class="flex-container">
                <li>
                    <a href="#" @click.prevent="deleteComponent" title="Delete this component (and its content)">
                        <CmdIcon iconClass="icon-trash" />
                    </a>
                </li>
                <li>
                    <a href="#" @click.prevent="cancelComponent" title="Cancel editing (changes will not be saved)">
                        <CmdIcon iconClass="icon-cancel" />
                    </a>
                </li>
                <li>
                    <a v-if="editContent" href="#" @click.prevent="saveComponent" title="Save content of this component">
                        <CmdIcon iconClass="icon-check" />
                    </a>
                    <a v-else href="#" @click.prevent="editComponent" title="Edit content of this component">
                        <CmdIcon iconClass="icon-edit" />
                    </a>
                </li>
                <li>
                    <a href="#" @click.prevent="editSettings" title="Edit settings of this component">
                        <CmdIcon iconClass="icon-cog" />
                    </a>
                </li>
            </ul>
            <div v-if="showSettings && sectionId">
                <CmdFormElement
                    element="input"
                    type="checkbox"
                    :replaceInputType="true"
                    labelText="Show entry in main navigation"
                    v-model="showLinkInMainNavigation"
                />
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Link icon-class"
                    v-model="linkIconClass"
                />
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Link text"
                    v-model="linkText"
                />
                <CmdFormElement
                    element="input"
                    type="checkbox"
                    :toggle-switch="true"
                    onLabelText="Columns"
                    offLabelText="Rows"
                    labelText="Content arrangement"
                    v-model="contentArrangement"
                />
                <CmdFormElement
                    element="input"
                    type="number"
                    min="1"
                    max="6"
                    labelText="Columns"
                    v-model="numberOfItems"
                />

                <div class="button-wrapper">
                    <button @click="saveSettings">
                        <span class="icon-check"></span><span>Save</span>
                    </button>
                    <button @click="cancelSettings">
                        <span class="icon-cancel"></span><span>Cancel</span>
                    </button>
                </div>
            </div>

            <!-- end action-buttons -->
            <!-- begin slot -->
            <slot :editContent="editContent" :editModeEvents="editModeEvents"></slot>
            <!-- end slot -->
        </template>
        <a v-else class="add-content" href="#" @click.prevent="addComponent" title="Add content">
            <span class="icon-plus"></span>
        </a>
    </div>
</template>

<script>
// import components from comand-component-library
import {CmdFormElement} from 'comand-component-library'
import {CmdIcon} from 'comand-component-library'

import mitt from "mitt"
import {mapActions} from "pinia";
import {usePiniaStore} from "../../stores/pinia.js";

export default {
    name: "EditContentWrapper",
    components: {
        CmdFormElement,
        CmdIcon
    },
    data() {
        return {
            contentArrangement: "columns",
            numberOfItems: 3,
            editContent: false,
            editModeEvents: new mitt(),
            showSettings: false,
            showLinkInMainNavigation: true,
            linkIconClass: null,
            linkText: null
        }
    },
    props: {
        componentExists: {
            type: Boolean,
            default: true
        },
        allowAddComponent: {
            type: Boolean,
            default: false
        },
        sectionId: {
          type: String,
          required: false
        },
        sectionShowLinkInMainNavigation: {
            type: Boolean,
            default: true
        },
        sectionLinkIconClass: {
            type: String,
            required: false
        },
        sectionLinkText: {
            type: String,
            required: false
        }
    },
    methods: {
        ...mapActions(usePiniaStore, ["updateContentSection"]),
        deleteComponent() {
            if (confirm("Delete this component and its content?")) {
                this.$emit("delete")
            }
        },
        addComponent() {
            this.$emit("add")
        },
        cancelComponent() {
            this.editContent = false
            this.$emit("cancel")
        },
        editComponent() {
            this.editContent = true
            this.$emit("edit")
        },
        saveComponent() {
            this.editContent = false
            this.$emit("save")
            this.editModeEvents.emit("save")
        },
        editSettings() {
            this.showSettings = !this.showSettings
        },
        cancelSettings() {
            this.showLinkInMainNavigation = this.sectionShowLinkInMainNavigation
            this.linkIconClass = this.sectionLinkIconClass
            this.linkText = this.sectionLinkText
            this.showSettings = false
        },
        saveSettings() {
            this.updateContentSection(this.sectionId,{
                showLinkInMainNavigation: this.showLinkInMainNavigation,
                iconClass: this.linkIconClass,
                navEntry: this.linkText
            })
            this.showSettings = false
        }
    },
    watch: {
        sectionShowLinkInMainNavigation: {
            handler() {
                this.showLinkInMainNavigation = this.sectionShowLinkInMainNavigation
            },
            immediate: true
        },
        sectionLinkIconClass: {
            handler() {
                this.linkIconClass = this.sectionLinkIconClass
            },
            immediate: true
        },
        sectionLinkText: {
            handler() {
                this.linkText = this.sectionLinkText
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
main {
    div.edit-mode {
        &:hover, &:active, &:focus {
            border: var(--default-border);
            border-style: dashed;
        }

        > ul {
            display: none;
        }

        &:hover, &:active, &:focus {
            > ul {
                display: flex;
                gap: calc(var(--default-gap) / 2);
                position: absolute;
                top: var(--default-margin);
                right: var(--default-margin);
                z-index: 100;
                margin: 0;

                li {
                    list-style-type: none;
                    margin: 0;
                }
            }
        }
    }

    .cmd-form-element {
        &.edit-mode {
            input {
                background: none;
                width: 100%;
                border-style: dashed;

                &:focus {
                    background: var(--pure-white);
                }
            }
        }
    }

    input, textarea {
        &.edit-mode {
            background: none;
            width: 100%;
            border-style: dashed;

            &:focus {
                background: var(--pure-white);
            }
        }

        &.headline {
            margin-bottom: var(--default-margin);
            font-size: 2.6rem;
            font-weight: var(--headline-font-weight);
        }
    }

    a.add-content {
        display: block;
        padding: var(--default-padding);
        text-align: center;
    }
}
</style>