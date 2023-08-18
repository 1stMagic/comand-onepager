<template>
    <CmdWidthLimitationWrapper :id="'section-wrapper-' + id">
        <a :id="'anchor-' + id"></a>
        <div class="flex-container vertical">
            <EditComponentWrapper
                componentName="CmdHeadline"
                :componentProps="{headlineText, headlineLevel}"
                :componentPath="componentPath(id)">
                <!-- begin cmd-headline (headline is required in section) -->
                <CmdHeadline :headlineText="headlineText" :headlineLevel="headlineLevel"/>
                <!-- end cmd-headline -->
            </EditComponentWrapper>

            <CmdContent
                :sectionId="id"
                :components="components"
            />
        </div>
    </CmdWidthLimitationWrapper>
</template>

<script>
/* import components from comand-component-library */
import { CmdHeadline, CmdWidthLimitationWrapper } from 'comand-component-library'

// import mixins
import BaseI18nComponent from "./mixins/BaseI18nComponent"

export default {
    components: {
        CmdHeadline,
        CmdWidthLimitationWrapper
    },
    mixins: [
        BaseI18nComponent
    ],
    props: {
        id: {
            type: String,
            required: false
        },
        headlineText: {
            type: String,
            required: false
        },
        headlineLevel: {
            type: [String, Number],
            default() {
                return 2
            }
        },
        components: {
            type: Array,
            required: false
        },
        content: {
            type: String,
            required: false
        }
    },
    computed: {
        cmdSlideButtons() {
            return {
                next: {
                    next: {
                        type: "next",
                        iconClass: "icon-single-arrow-right",
                        tooltip: this.label("slidebutton_next.tooltip")
                    }
                },
                prev: {
                    prev: {
                        type: "prev",
                        iconClass: "icon-single-arrow-left",
                        tooltip: this.label("slidebutton_previous.tooltip")
                    }
                }
            }
        }
    },
    methods: {
        componentPath(sectionId) {
            return [
                "main",
                "sections",
                {id: sectionId}
            ]
        }
    }
}
</script>
