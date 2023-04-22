<template>
    <!-- begin content -->
    <main>
        <!-- begin cmd-slideshow -->
        <CmdSlideshow
            v-if="slideshow.slideshowItems?.length"
            :slideshow-items="slideshow.slideshowItems"
            :full-width="true"
            :autoplay="false"
            :cmdSlideButtons="cmdSlideButtons"
        />
        <!-- end cmd-slideshow -->

        <!-- begin main content -->
        <div id="page-content">
            <CmdWidthLimitationWrapper v-if="editMode">
                <EditContentWrapper :componentExists="false" @add="addComponent('contentSection')"/>
            </CmdWidthLimitationWrapper>

            <template v-if="editMode">
                <EditContentWrapper
                    v-for="(section, index) in sections" :key="index" :id="section.id"
                    @delete="deleteComponent('contentSection')"
                    :sectionShowLinkInMainNavigation="section.showLinkInMainNavigation"
                    :sectionLinkIconClass="section.iconClass"
                    :sectionLinkText="section.navEntry"
                    :sectionId="section.id"
                >
                    <!-- begin content sections -->
                    <template v-slot="slotProps">
                        <ContentSection
                            :components="section.components"
                            :sectionId="section.id"
                            :headlineText="section.headline"
                            :editContent="slotProps.editContent"
                            :editModeEvents="slotProps.editModeEvents"
                        />
                    </template>
                    <!-- end content sections -->
                </EditContentWrapper>
            </template>

            <template v-else>
                <!-- begin content sections -->
                <ContentSection
                    v-for="(section, index) in sections" :key="index"
                    :id="section.id"
                    :headlineText="section.headline"
                    :components="section.components"
                />
                <!-- end content sections -->
            </template>
        </div>
        <!-- end main content -->
    </main>
    <!-- end content -->
</template>

<script>
// import used data
import BaseI18nComponent from "./mixins/BaseI18nComponent"

import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"

export default {
    data() {
        return {
            slideshowData: [],
            shareButtons: []
        }
    },
    mixins: [
        BaseI18nComponent
    ],
    methods: {
        deleteComponent(componentName, sectionId) {
            if (componentName === "mainHeadline") {
                this.updateMainHeadlineState(false)
            } else if (componentName === "contentSection") {
                this.deleteContentSection(sectionId)
            }
        },
        addComponent(componentName) {
            if (componentName === "mainHeadline") {
                this.updateMainHeadlineState(true)
            } else if (componentName === "contentSection") {
                this.addContentSection()
            }
        },
        ...mapActions(usePiniaStore, ["updateMainHeadlineState", "deleteContentSection", "addContentSection"])
    },
    computed: {
        ...mapState(usePiniaStore, ["site", "currentLanguage", "editMode", "mainHeadline", "slideshow", "sections"]),

        cmdSlideButtons() {
            return {
                next: {
                    iconClass: "icon-single-arrow-right",
                    tooltip: this.label("slidebutton_next.tooltip")
                },
                prev: {
                    iconClass: "icon-single-arrow-left",
                    tooltip: this.label("slidebutton_previous.tooltip")
                }
            }
        }
    }
}
</script>
