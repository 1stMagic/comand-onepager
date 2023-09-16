<template>
    <div class="edit-mode">
        <template v-if="componentExists">
            <!-- begin slot -->
            <slot></slot>
            <!-- end slot -->
        </template>
    </div>
</template>

<script>
// import components from comand-component-library
import {CmdFormElement, CmdIcon} from 'comand-component-library'

export default {
    name: "EditSectionWrapper",
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
