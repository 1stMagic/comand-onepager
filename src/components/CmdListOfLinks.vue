<template>
    <div :class="['cmd-list-of-links', {box: styleAsBox, horizontal: orientation === 'horizontal', 'section-anchors': sectionAnchors, 'large-icons': largeIcons}]" style="padding: 2rem;">
        <!-- begin cmd-headline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext?.editing"
            v-bind="cmdHeadline"
        />
        <!-- end cmd-headline -->

        <!-- begin list of links -->
        <ul :class="['flex-container', {'no-gap': !useGap},'align-' + align, setStretchClass]">
            <CmdLinkItem
                    v-if="!editModeContext"
                    v-for="(link, index) in links"
                    :key="index"
                    :class="{'active': sectionAnchors && activeSection === index}"
                    :link="link"
            />

            <!-- begin edit-mode -->
            <EditComponentWrapper v-else
                                  v-for="(link, index) in links"
                                  :key="'x' + index"
                                  componentName="CmdLinkItem"
                                  :componentProps="link"
                                  :editModeContextData="{linkIndex: index}"
                                  :componentIdentifier="componentIdentifier(index)"
            >
                <CmdLinkItem
                    :class="{'active': sectionAnchors && activeSection === index}"
                    :link="link"
                    :editModeContextData="{linkIndex: index}"
                />
            </EditComponentWrapper>
            <!-- end edit-mode -->
        </ul>
        <!-- end list of links -->
    </div>
</template>

<script>
// import functions
//import {getRoute} from "../utilities.js"
//import {openFancyBox} from "./CmdFancyBox.vue"

import {useEditModeContext} from "../editmode/editModeContext.js";

export default {
    name: "CmdListOfLinks",
    emits: ["click"],
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
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * activate if component should contain a list of anchors for the section within the page
         */
        sectionAnchors: {
            type: Boolean,
            default: false
        },
        /**
         * given active section from outside to set class for styling
         *
         * sectionAnchors-property must be activated
         */
        activeSection: {
            type: Number,
            default: 0
        },
        /**
         * activate if large icons should be displayed above link text
         *
         * @affectsStyling: true
         */
        largeIcons: {
            type: Boolean,
            default: false
        },
        /**
         * set horizontal alignment
         *
         * orientation-property must be set to 'horizontal'
         *
         * @allowedValues: left, center, right
         */
        align: {
            type: String,
            default: "left"
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * list of displayed links
         */
        links: {
            type: Array,
            required: false
        },
        /**
         * toggle orientation of list
         *
         * @allowedValues: horizontal, vertical
         */
        orientation: {
            type: String,
            default: "vertical"
        },
        /**
         * toggle gab between links
         */
        useGap: {
            type: Boolean,
            default: true
        },
        /**
         * style component like a box
         *
         * @affectsStyling: true
         */
        styleAsBox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {tb: true}, this.onSave, this.onDelete),
        }
    },
    computed: {
        setStretchClass() {
            if(this.largeIcons && this.orientation === "horizontal") {
                return "stretch"
            }
            return null
        }
    },
    methods: {
        getRoute(link) {
            return getRoute(link)
        },
        executeLink(link, event) {
            if (link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link.path, showSubmitButtons: link.showSubmitButtons})
                return
            }
            this.$emit("click", {link, originalEvent: event})
        },
        componentIdentifier(index) {
            const identifier = []
            identifier.push(this.editModeContextData.componentIndex)

            if(this.editModeContextData.childComponentIndex != null) {
                identifier.push(this.editModeContextData.childComponentIndex)
            }

            identifier.push(index)

            return identifier.join(".")
        },
        onSave(data) {
            console.log("ListOfLinks.save()", data)
            if (!Array.isArray(data)) {
                data = [data]
            }
            const linkIndex = data[0].editModeContextData.linkIndex;
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                update(props) {
                    console.log("ListOfLinks.update()", props)
                    props.links[linkIndex] = {
                        ...props.links[linkIndex],
                        ...data[0].link
                    }
                    data.filter(dataItem => typeof dataItem.update === "function").forEach(dataItem => dataItem.update(props))
                }
            }
        },
        onDelete(data) {
            const result = {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                }
            }
            if (data && data.length > 0) {
                const linkIndex = data[0].editModeContextData.linkIndex
                result.delete = (props) => props.links.splice(linkIndex, 1)
            }
            return result
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-list-of-links ---------------------------------------------------------------------------------------- */
.cmd-list-of-links {
    display: flex;
    flex-direction: column;

    ul {
        flex-direction: column;
        gap: calc(var(--default-gap) / 2);
        margin: 0;

        li {
            list-style: none;
            margin-left: 0;
        }
    }

    &.horizontal {
        ul {
            gap: var(--default-gap);
            flex-direction: row;

            > li {
                flex: none;
                display: flex;
            }

            &.align-center {
                justify-content: center;
            }

            &.align-right {
                justify-content: flex-end;
            }

            &.stretch {
                justify-content: space-around;
            }
        }

    }

    &.large-icons {
        li a {
            display: flex;
            flex-direction: column;
            gap: calc(var(--default-gap) / 4);
            text-decoration: none;
            align-items: center;
            justify-content: center;

            span {
                margin: 0;
            }

            [class*="icon-"] {
                font-size: 5rem;
            }
        }
    }
}
/* end cmd-list-of-links------------------------------------------------------------------------------------------ */
</style>