<template>
    <CmdSidebar
        v-if="showMainSidebar"
        :openSidebar="openSidebarStatus"
        @toggleSidebar="setOpenStatus($event)"
        id="edit-mode-main-sidebar"
        :cmdHeadline="{headlineText: 'Site Settings', headlineLevel: 3, textAlign: 'center'}"
    >
        <template v-slot:open>
            <div class="accordions-wrapper">
                <CmdSystemMessage v-if="showSystemMessage" validation-status="success" system-message="You changes have been saved successfully!" />
                <EditModeTemplateSettings :openBox="openTemplateSettingsStatus" :editModeMessage="editModeMessage" @input="changeTemplate" />
                <EditModeMetaDataSettings :openBox="openMetaSettingsStatus" />
                <EditModeSectionsSettings :openBox="openSectionsSettingsStatus" />
            </div>
            <div class="button-wrapper stretch-buttons action-buttons-wrapper">
                <button class="button confirm" @click="saveSettings">
                    <span class="icon-check-circle"></span>
                    <span>Save</span>
                </button>
                <button class="button cancel" @click="cancelSettings">
                    <span class="icon-cancel-circle"></span>
                    <span>Cancel</span>
                </button>
            </div>
        </template>
        <template v-slot:closed>
            <div class="closed-sidebar">
                <a class="button primary" href="#" title="Open Template Settings" @click.prevent="openTemplateSettings">
                    <span class="icon-settings-template"></span>
                </a>
                <a class="button primary" href="#" title="Open Meta Settings" @click.prevent="openMetaSettings">
                    <span class="icon-html"></span>
                </a>
                <a class="button primary" href="#" title="Open Section Settings" @click.prevent="openSectionsSettings">
                    <span class="icon-settings-component"></span>
                </a>
            </div>
        </template>
    </CmdSidebar>
</template>

<script>
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../../stores/pinia.js"

export default {
    name: "EditModeMainSidebar",
    inject: {
        editModeContext: {
            default: false
        }
    },
    data() {
        return {
            openSidebarStatus: true,
            showMainSidebar: true,
            showSystemMessage: false,
            openTemplateSettingsStatus: false,
            openMetaSettingsStatus: false,
            openSectionsSettingsStatus: false
        }
    },
    props: {
        editModeMessage: {
            type: Boolean
        }
    },
    methods: {
        ...mapActions(usePiniaStore, ["updateMetaData"]),

        setOpenStatus(event) {
            this.openSidebarStatus = event

            if(!this.openSidebarStatus) {
                this.openTemplateSettingsStatus = false
                this.openMetaSettingsStatus = false
                this.openSectionsSettingsStatus = false
            }
        },
        openTemplateSettings() {
            this.openSidebarStatus = true
            this.openTemplateSettingsStatus = true
        },
        openMetaSettings() {
            this.openSidebarStatus = true
            this.openMetaSettingsStatus = true
        },
        openSectionsSettings() {
            this.openSidebarStatus = true
            this.openSectionsSettingsStatus = true
        },
        cancelSettings() {
            if (confirm("Are you sure your want to cancel? (Changes will not be saved!)")) {
                this.showSystemMessage = false
                this.openTemplateSettingsStatus = false
                this.openMetaSettingsStatus = false
                this.openSectionsSettingsStatus = false
                this.openSidebarStatus = false
            }
        },
        saveSettings() {
            const metaData = {
                title: this.title,
                description: this.metaDescription,
                rating: this.metaRating,
                robots: this.metaRobots,
                author: this.metaAuthor
            }

            this.updateMetaData(metaData)

            this.showSystemMessage = true
        },
        changeTemplate(event) {
            this.$emit("change-template", event)
        }
    },
    computed: {
        ...mapState(usePiniaStore, ["metaData"])
    }
}
</script>

<style lang="scss">
.edit-mode {
    #edit-mode-main-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        max-width: 30rem;
        height: 100vh;
        margin: 0;
        padding: 0;
        gap: 0;
        border: 0;
        border-right: var(--default-border);

        select {
            color: var(--text-color);
        }

        &.open {
            width: 30rem;

            .cmd-box {
                border: 0;

                &:last-of-type {
                    border-bottom: var(--default-border);
                }
            }
        }
    }

    .cmd-sidebar {
        display: flex;

        .inner-sidebar-wrapper {
            display: flex;
            flex-direction: column;
        }

        .open-slot-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .box:not(:first-of-type) {
                border-top: var(--default-border) !important;
                border-color: var(--pure-white) !important;
            }
        }
    }

    .action-buttons-wrapper {
        padding: var(--default-padding);
    }

    .closed-sidebar {
        display: flex;
        flex-direction: column;
        gap: var(--default-gap);
        padding: var(--default-padding);
    }
}
</style>