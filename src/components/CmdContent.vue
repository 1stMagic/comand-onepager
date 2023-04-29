<template>
    <div :class="['cmd-content flex-container', {'reverse': alignImage === 'right'}]">
        <CmdContentItem v-for="(component, index) in components" :key="index">
            <component
                :is="component.name"
                v-bind="component.props"
                :editContent="editContent"
                :editModeEvents="editModeEvents"
                @save="onComponentSave($event, component, index)"
            >
                <component
                    v-for="(childComponent, childComponentIndex) in component.components || []"
                    :key="childComponentIndex" :is="childComponent.name"
                    v-bind="childComponent.props"
                    :editContent="childComponent.editContent" />
            </component>
        </CmdContentItem>
    </div>
</template>

<script>
import {mapActions} from "pinia"
import {usePiniaStore} from "../stores/pinia"

export default {
    name: "CmdContent",
    data() {
        return {
            savedHtmlHeadline: null,
            savedHtmlContent: null,
            savedHtmlContentTop: null,
            savedHtmlContentBottom: null,
            savedImgAltText: null,
            savedImgFigcaption: null
        }
    },
    props: {
        editModeEvents: {},
        editContent: {
            type: Boolean,
            default: false
        },
        sectionId: {
            type: String
        },
        images: {
            type: Array,
            required: false
        },
        alignImage: {
            type: String,
            default: "left"
        },
        htmlHeadline: {
            type: String,
            required: false
        },
        htmlContent: {
            type: String,
            required: false
        },
        htmlContentTop: {
            type: String,
            required: false
        },
        htmlContentBottom: {
            type: String,
            required: false
        },
        cmdHeadline: {
            type: Object,
            required: false
        },
        cmdSlideButtons: {
            type: Object,
            required: false
        },
        components: {
            type: Array,
            required: true
        }
    },
    computed: {
        editableHtmlHeadline: {
            get() {
                return this.savedHtmlHeadline || this.htmlHeadline
            },
            set(value) {
                this.savedHtmlHeadline = value
            }
        },
        editableHtmlContent: {
            get() {
                return this.savedHtmlContent || this.htmlContent
            },
            set(value) {
                this.savedHtmlContent = value
            }
        },
        editableHtmlContentTop: {
            get() {
                return this.savedHtmlContentTop || this.htmlContentTop
            },
            set(value) {
                this.savedHtmlContentTop = value
            }
        },
        editableHtmlContentBottom: {
            get() {
                return this.savedHtmlContentBottom || this.htmlContentBottom
            },
            set(value) {
                this.savedHtmlContentBottom = value
            }
        },
        imgAltText: {
            get() {
                return this.savedImgAltText || this.images?.[0].alt
            },
            set(value) {
                this.savedImgAltText = value
            }
        },
        imgFigcaption: {
            get() {
                return this.savedImgFigcaption || this.images?.[0].figcaption
            },
            set(value) {
                this.savedImgFigcaption = value
            }
        }
    },
    // mounted() {
    //     this.editModeEvents.on("save", this.onSave)
    // },
    // beforeUnmount() {
    //     this.editModeEvents.off("save", this.onSave)
    // },
    methods: {
        ...mapActions(usePiniaStore, ["updateSectionComponent"]),
        onComponentSave(componentData, component, componentIndex) {
            this.updateSectionComponent(this.sectionId, componentIndex, componentData)
        },
        onSave() {
            const sectionData = {
                content: this.editableHtmlContent,
                contentTop: this.editableHtmlContentTop,
                contentBottom: this.editableHtmlContentBottom
            }

            if (this.images?.length) {
                sectionData.images = [this.$refs.image.getImage()]
                // sectionData.images = JSON.parse(JSON.stringify(this.images))
                // sectionData.images[0].alt = this.imgAltText
                // sectionData.images[0].figcaption = this.imgFigcaption
            }

            //this.updateContentSection(this.sectionId, sectionData)
        }
    }
}
</script>

<style lang="scss">
.cmd-content {
    &.reverse {
        flex-direction: row-reverse;
    }
}
</style>