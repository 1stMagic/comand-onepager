<template>
    <div class="edit-mode">
        <template v-if="componentExists">
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
                    <button>
                        <span class="icon-check"></span><span>Save</span>
                    </button>
                    <button>
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
import {mapActions} from "pinia"
import {usePiniaStore} from "../../stores/pinia.js"
import {useEditModeContext} from "../../editmode/editModeContext.js"

export default {
    name: "EditSectionWrapper",
    components: {
        CmdFormElement,
        CmdIcon
    },
    data() {
        return {
            context: useEditModeContext(null, { sectionId: this.sectionId }, this.onSave, this.onDelete),
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
    provide() {
        return {
            editModeContext: this.context
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
        ...mapActions(usePiniaStore, ["updateSectionComponent", "deleteSectionComponent"]),
        onSave(data) {
            if (data) {
                const modifications = Array.isArray(data) ? data : [data]
                modifications.forEach(modification => this.updateSectionComponent(this.sectionId, modification.editModeContextData.componentIndex, modification.update))
            }
        },
        onDelete(data) {
            console.log("onDelete", this.sectionId, data)
            if (data) {
                const modifications = Array.isArray(data) ? data : [data]
                modifications.forEach(modification => this.deleteSectionComponent(this.sectionId, modification.editModeContextData.componentIndex, modification.delete))
            }
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
        border: var(--default-border);
        border-color: transparent;

        &:hover, &:active, &:focus {
            background: hsl(0deg, 0%, 98%);
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
            padding: 0;
            height: auto;
            background: none;
            width: 100%;
            border-style: dashed;

            &:focus {
                background: var(--pure-white);
            }
        }

        &[class*="headline"] {
            font-weight: var(--headline-font-weight);

          &.h1 {
            font-size: 3rem; /* font-size for h1 */
          }

          &.h2 {
            font-size: 2.6rem; /* font-size for h2 */
          }

          &.h3 {
            font-size: 2.2rem; /* font-size for h3 */
          }

          &.h4 {
            font-size: 2rem; /* font-size for h4 */
          }

          &.h5 {
            font-size: 1.8rem; /* font-size for h5 */
          }

          &.h6 {
            font-size: 1.6rem; /* font-size for h6 */
          }
        }
    }

  #section-wrapper-main-headline {
    input.edit-mode {
      &[class*="headline"] {
        font-weight: var(--headline-font-weight);

        &.h1 {
          font-size: 5rem;
          text-align: center;
          text-transform: uppercase;
        }
      }
    }
  }

    a.add-content {
        display: block;
        padding: var(--default-padding);
        text-align: center;
    }
}
</style>