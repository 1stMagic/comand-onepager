<template>
    <!-- begin main-content -->
    <main>
        <!-- begin edit-mode for content-sections -->
        <template v-if="editMode">
            <EditModeSectionWrapper
                v-for="(section, index) in sections" :key="index"
                :id="'edit-mode-' + section.id"
                :sectionId="section.id"
                :sectionPath="['main', 'sections', index]"
                :sectionProps="{showLinkInMainNavigation: section.showLinkInMainNavigation, navEntry: section.navEntry, order: section.order}"
            >
                <!-- begin content sections -->
                <template v-slot="slotProps">
                    <ContentSection
                        :components="section.components"
                        :id="section.id"
                        :allowAddComponent="section.allowAddComponent"
                        :headlineText="section.headlineText"
                    />
                </template>
                <!-- end content sections -->
            </EditModeSectionWrapper>
        </template>
        <!-- end edit-mode for content-sections  -->

        <!-- begin default-view for content-sections -->
        <template v-else>
            <!-- begin content sections -->
            <ContentSection
                v-for="(section, index) in sections"
                :key="index"
                :id="section.id"
                :headlineText="section.headlineText"
                :components="section.components"
            />
            <!-- end content sections -->
        </template>
        <!-- end default-view for content-sections -->
    </main>
    <!-- end main-content -->
</template>

<script>
// import used data
import BaseI18nComponent from "./mixins/BaseI18nComponent"

import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"
import {createUuid} from "comand-component-library";

export default {
    mixins: [
        BaseI18nComponent
    ],
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
    },
    methods: {
        componentPath() {
            return [
                "main",
                "slideshow"
            ]
        },
        ...mapActions(usePiniaStore, ["addContent"]),

        addSection() {
            this.addContent(["main", "sections", -1], {
                item() {
                    return {
                        id: createUuid(),
                        iconClass: "",
                        navEntry: "New section",
                        allowAddComponent: true,
                        components: []
                    }
                }
            })
        }
    }
}
</script>
