import {reactive} from "vue"
import {usePiniaStore} from "../stores/pinia.js"

export function useEditModeContext() {

    const store = usePiniaStore()
    const state = reactive({})

    return {
        state,
        content: contentActions(store, state),
        settings: settingsActions(state),
        system: systemActions(state)
    }
}

function contentActions(store, state) {
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
        addContent(componentPath, itemProvider, componentPosition) {
            store.addContent(componentPath, {item: itemProvider}, componentPosition)
        },
        deleteContent(componentPath) {
            store.deleteContent(componentPath)
        }
    }
}

function settingsActions(state) {
    return {
        startEditing(componentIdentifier, componentName, componentProps, allowedContentTypes, componentPath, saveHandler) {
            state.settingsEditing = componentIdentifier
            state.componentName = componentName
            state.componentProps = componentProps
            state.allowedContentTypes = allowedContentTypes
            state.componentPath = componentPath
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
        updateEditing(componentName, componentProps) {
            state.componentName = componentName
            state.componentProps = componentProps
        },
        getComponentName() {
            return state.componentName
        },
        getComponentProps() {
            return state.componentProps
        },
        getAllowedContentTypes() {
            return state.allowedContentTypes
        },
        getComponentPath() {
            return state.componentPath
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
        setActiveComponent(componentPath) {
            const componentIdentifier = JSON.stringify(componentPath)
            if (state.activeComponentIdentifier !== componentIdentifier) {
                state.contentEditing = null
            }
            state.activeComponentIdentifier = componentIdentifier;
            state.activeComponentPath = componentPath;
        },
        isActiveComponent(componentPath) {
            const componentIdentifier = JSON.stringify(componentPath)
            if (state.activeComponentIdentifier === componentIdentifier) {
                return true
            }
            if (state.activeComponentPath && componentPath.length >= state.activeComponentPath.length) {
                return JSON.stringify(componentPath.slice(0, state.activeComponentPath.length)) === state.activeComponentIdentifier
            }
            return false
        }
    }
}
