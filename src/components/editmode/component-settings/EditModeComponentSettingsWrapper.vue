<template>
<aside class="edit-mode-component-settings-wrapper flex-container vertical box">
    <h3>Component Settings</h3>
    <h4>{{componentName}}</h4>
    <component ref="settings" :is="settingsComponentName" v-bind="componentProps" />
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
export default {
    name: "EditModeComponentSettingsWrapper.vue",
    inject: ["editModeContext"],
    computed: {
        componentName() {
            return this.editModeContext.settings.getComponentName()
        },
        componentProps() {
            return this.editModeContext.settings.getComponentProps()
        },
        settingsComponentName() {
            return this.editModeContext.settings.getSettingsComponentName()
        }
    },
    methods: {
        cancelSettings() {
            if(confirm('Are you sure your want to cancel? (changes will not be saved)')) {
                this.editModeContext.settings.stopEditing()
            }
        },
        saveSettings() {
            const saveHandler = this.editModeContext.settings.getSettingsSaveHandler()
            saveHandler(this.$refs.settings.updateCallbackProvider())
            this.editModeContext.settings.stopEditing()
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
