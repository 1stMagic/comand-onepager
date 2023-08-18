import {reactive} from "vue"

export function useEditModeContext() {
    const state = reactive({})

    return {
        state,
        content: contentActions(state),
        settings: settingsActions(state),
        system: systemActions(state)
    }
}

function contentActions(state) {
    return {
        startEditing(componentIdentifier) {
            state.contentEditing = componentIdentifier
        },
        isEditing(componentIdentifier) {
            return state.contentEditing === componentIdentifier
        },
        stopEditing() {
            state.contentEditing = null
        }
    }
}

function settingsActions(state) {
    return {
        startEditing(componentIdentifier, componentName, componentProps, saveHandler) {
            state.settingsEditing = componentIdentifier
            state.componentName = componentName
            state.componentProps = componentProps
            state.settingsSaveHandler = saveHandler
        },
        isEditing(componentIdentifier) {
            return state.settingsEditing === componentIdentifier
        },
        stopEditing() {
            state.settingsEditing = null
            state.componentName = null
            state.componentProps = null
            state.settingsSaveHandler = null
        },
        show() {
            return !!state.componentName
        },
        getComponentName() {
            return state.componentName
        },
        getComponentProps() {
            return state.componentProps
        },
        getSettingsComponentName() {
            return `${state.componentName}Settings`
        },
        getSettingsSaveHandler() {
            return state.settingsSaveHandler
        }
    }
}

function systemActions(state) {
    return {
        setActiveComponent(componentIdentifier) {
            state.activeComponentIdentifier = componentIdentifier
            if (state.contentEditing !== componentIdentifier) {
                state.contentEditing = null
            }
        },
        isActiveComponent(componentIdentifier) {
            return state.activeComponentIdentifier === componentIdentifier
        }
    }
}
