import {reactive, watchEffect} from "vue"

export function useEditModeContext() {
    const state = reactive({})
    const systemState = {
        componentGroups: {}
    }

    return {
        state,
        content: contentActions(state, systemState),
        settings: settingsActions(state, systemState),
        system: systemActions(state, systemState)
    }
}

function contentActions(state, systemState) {
    return {
        startEditing(componentIdentifier) {
            state.contentEditing = componentIdentifier
        },
        isEditing(componentIdentifier) {
            return state.contentEditing === componentIdentifier
        },
        stopEditing() {
            state.contentEditing = null
        },
        watchEditingFlag(watcherCallback) {
            const watcherComponentGroup = systemState.currentComponentGroup
            watchEffect(() => {
                watcherCallback(state.contentEditing === watcherComponentGroup)
            })
        },
        addUpdateHandlerProvider(provider) {
            if (systemState.currentComponentGroup) {
                systemState.componentGroups[systemState.currentComponentGroup].updateHandlerProviders.push(provider)
            }
        },
        getUpdateHandlerProviders(componentIdentifier) {
            return systemState.componentGroups[componentIdentifier]?.updateHandlerProviders || []
        }
    }
}

function settingsActions(state, systemState) {
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
        watchEditingFlag(watcherCallback) {
            const watcherComponentGroup = systemState.currentComponentGroup
            watchEffect(() => {
                watcherCallback(state.settingsEditing === watcherComponentGroup)
            })
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

function systemActions(state, systemState) {
    return {
        getActiveComponent() {
            return state.activeComponentIdentifier
        },
        setActiveComponent(componentIdentifier) {
            state.activeComponentIdentifier = componentIdentifier
            if (state.contentEditing !== componentIdentifier) {
                state.contentEditing = null
            }
        },
        isActiveComponent(componentIdentifier) {
            return state.activeComponentIdentifier === componentIdentifier
        },
        setCurrentComponentGroup(componentIdentifier) {
            if (systemState.currentComponentGroup !== componentIdentifier) {
                systemState.componentGroups[componentIdentifier] = {
                    updateHandlerProviders: []
                }
                systemState.currentComponentGroup = componentIdentifier
            }
        }
    }
}
