<template>
    <div :class="['edit-mode section-wrapper', {active}]" @click.stop="showActionButtons">
        <div v-show="active" class="action-buttons-wrapper">
            <!-- begin action-buttons -->
            <ul class="flex-container no-flex action-buttons">
                <li>
                    <a class="icon-square button confirm use-icon-as-background"
                       href="#"
                       @click.prevent="addSection"
                       title="Add a new section">
                        <CmdIcon iconClass="icon-plus"/>
                    </a>
                </li>
                <li>
                    <a class="icon-square button button-delete use-icon-as-background"
                       href="#"
                       @click.prevent="deleteSection"
                       title="Delete this section (and its content)">
                        <CmdIcon iconClass="icon-trash"/>
                    </a>
                </li>
            </ul>
            <!-- end action-buttons -->
        </div>
        <template v-if="componentExists">
            <!-- begin slot -->
            <slot></slot>
            <!-- end slot -->
        </template>
    </div>
</template>

<script>
// import components from comand-component-library
import {CmdFormElement, CmdIcon, createUuid} from 'comand-component-library'
import {findEditComponentWrapper} from "../../utils/editmode.js"
import {mapActions} from "pinia";
import {usePiniaStore} from "../../stores/pinia.js";

export default {
    name: "EditModeSectionWrapper",
    inject: {
        editModeContext: {}
    },
    components: {
        CmdFormElement,
        CmdIcon
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
        sectionPath: {
            type: Array,
            required: true
        }
    },
    computed: {
        active() {
            return this.editModeContext.system.isActiveSection(this.sectionPath)
        }
    },
    methods: {
        ...mapActions(usePiniaStore, ["addContent", "deleteContent"]),

        addSection() {
            this.addContent(this.sectionPath, {
                item() {
                    return {
                        id: createUuid(),
                        iconClass: "",
                        navEntry: "New section",
                        allowAddComponent: true,
                        components: []
                    }
                }
            }, "before")
        },
        deleteSection() {
            if (confirm("Delete this section and all its content?")) {
                this.deleteContent(this.sectionPath)
            }
        },
        showActionButtons() {
            this.editModeContext.system.setActiveSection(this.sectionPath)
        }
    }
}
</script>

<style lang="scss">
main {
    div.edit-mode {
        border: var(--default-border);
        border-color: transparent;

        &.active {
            border: var(--primary-border);
        }

        &:hover, &:active, &:focus {
            background: hsl(0deg, 0%, 98%);
            border: var(--default-border);
            border-style: dashed;

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

        > ul {
            display: none;
        }

        &.section-wrapper .action-buttons-wrapper {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;

            .action-buttons {
                margin: 0;
                gap: var(--default-gap-half);
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

    label {
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
