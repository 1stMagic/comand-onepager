<template>
<aside class="edit-mode-component-settings-wrapper flex-container vertical box">
    <h3>Component Settings</h3>
    <h4>{{editModeComponentName}}</h4>
    <component ref="settings" :is="componentName" v-bind="editModeComponentProps" />
    <div class="button-wrapper">
        <button class="button confirm" @click="saveSettings">
            <span class="icon-check"></span>
            <span>Save</span>
        </button>
        <button class="button cancel" @click="cancelSettings">
            <span class="icon-cancel"></span>
            <span>Cancel</span>
        </button>
    </div>
</aside>
</template>

<script>
import {mapActions} from "pinia";
import {mapState} from "pinia";
import {usePiniaStore} from "../../../stores/pinia.js";

export default {
    name: "EditModeComponentSettingsWrapper.vue",
    computed: {
        ...mapState(usePiniaStore, ["editModeComponentName", "editModeComponentProps", "persistHandler", "editModeContextData"]),
        componentName() {
            return this.editModeComponentName + "Settings"
        }
    },
    methods: {
        ...mapActions(usePiniaStore, ["closeEditModeComponentSettings"]),
        cancelSettings() {
            if(confirm('Are you sure your want to cancel? (changes will not be saved)')) {
                this.closeEditModeComponentSettings()
            }

        },
        saveSettings() {
            const data = this.$refs.settings.save(this.editModeContextData)
            this.persistHandler(data)
            this.closeEditModeComponentSettings()
        }
    }
}
</script>

<style lang="scss">
.edit-mode-component-settings-wrapper {
    max-width: 30rem;

    .button-wrapper > * {
        flex: 1;
    }

    input:not(.toggle-switch), select, textarea, .input {
        --input-height: 3rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
    }
}
</style>