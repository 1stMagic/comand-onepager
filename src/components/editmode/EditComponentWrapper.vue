<template>
    <div class="edit-component-wrapper" tabindex="0" @click="showActionButtons" :data-identifier="componentIdentifier">
        <!-- begin action-buttons -->
        <ul v-show="storeComponentIdentifier === componentIdentifier"
            class="flex-container no-flex no-gap action-buttons">
            <li>
                <a class="icon-hexagon button-delete" href="#" @click.prevent="deleteComponent"
                   title="Delete this component (and its content)">
                    <CmdIcon iconClass="icon-trash"/>
                </a>
            </li>
            <li>
                <a class="icon-hexagon disabled" href="#" @click.prevent="editSettings" title="Edit settings of this component">
                    <CmdIcon iconClass="icon-cog"/>
                </a>
            </li>
            <li>
                <a :class="['icon-hexagon button-cancel', {disabled: !context.editing}]" href="#"
                   @click.prevent="cancelComponent"
                   title="Cancel editing (changes will not be saved)">
                    <CmdIcon iconClass="icon-cancel"/>
                </a>
            </li>
            <li>
                <a v-if="context.editing" class="icon-hexagon button-save" href="#" @click.prevent="saveComponent"
                   title="Save changes of this component">
                    <CmdIcon iconClass="icon-check"/>
                </a>
                <a v-else class="icon-hexagon" href="#" @click.prevent="editComponent"
                   title="Edit content of this component">
                    <CmdIcon iconClass="icon-edit"/>
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
import {mapActions, mapState} from "pinia";
import {usePiniaStore} from "../../stores/pinia.js";
import {useEditModeContext} from "../../editmode/editModeContext.js";

export default {
    name: "EditComponentWrapper",
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {ecw: true})
        }
    },
    props: {
        /**
         * contains sectionId, componentIndex (and optionalchildComponentIndex)
         */
        componentIdentifier: {
            type: String,
            required: true
        }
    },
    provide() {
        return {
            editModeContext: this.context
        }
    },
    inject: {
        editModeContext: {
            default: null
        }
    },
    computed: {
        // provide states from store as computed-properties inside this component
        ...mapState(usePiniaStore, {storeComponentIdentifier: "componentIdentifier"})
    },
    methods: {
        // provide actions from store as methods inside this component
        ...mapActions(usePiniaStore, ["setComponentIdentifier"]),

        showActionButtons(event) {
            event.stopPropagation()
            this.setComponentIdentifier(this.componentIdentifier)
        },
        deleteComponent() {
            if (confirm("Delete this component and its content?")) {
                this.$emit("delete")
            }
        },
        addComponent() {
            this.$emit("add")
        },
        cancelComponent(event) {
            if (this.context.editing) {
                event.stopPropagation()
                this.context.editing = false
                this.actionButtons = false
                this.$emit("cancel")
            }
        },
        editComponent() {
            this.context.editing = true
            this.$emit("edit")
        },
        saveComponent() {
            this.context.save()
            this.context.editing = false
            this.$emit("save")
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
            this.updateContentSection(this.sectionId, {
                showLinkInMainNavigation: this.showLinkInMainNavigation,
                iconClass: this.linkIconClass,
                navEntry: this.linkText
            })
            this.showSettings = false
        }
    }
}
</script>

<style lang="scss">
.edit-component-wrapper {
  border: .1rem dashed transparent;
  transition: var(--default-transition);

  &:hover, &:active, &:focus {
    border-color: var(--medium-gray);
    background: hsl(0, 0%, 96%);
    transition: var(--default-transition);
  }

  &:focus {
    border-style: solid;
    border-color: var(--primary-color);

    .action-buttons {
      opacity: 1;
      transition: var(--default-transition);
    }
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