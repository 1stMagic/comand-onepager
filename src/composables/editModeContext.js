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
        setActiveComponent(componentIdent) {
            let componentIdentifier = componentIdent
            if (Array.isArray(componentIdent)) {
                componentIdentifier = JSON.stringify(componentIdent)
            }
            state.activeComponentIdentifier = componentIdentifier;
            state.activeComponentIdentifierArray = componentIdent;
            if (state.contentEditing !== componentIdentifier) {
                state.contentEditing = null
            }
        },
        isActiveComponent(componentIdent) {
            //return state.activeComponentIdentifier === componentIdentifier
            let componentIdentifier = componentIdent
            if (Array.isArray(componentIdent)) {
                componentIdentifier = JSON.stringify(componentIdent)
            }
            if (state.activeComponentIdentifier === componentIdentifier) {
                return true
            }
            if (Array.isArray(state.activeComponentIdentifierArray) && Array.isArray(componentIdent)) {
                const minLength = Math.min(state.activeComponentIdentifierArray.length, componentIdent.length)
                if (minLength > 3) {
                    for (let i = 0, c = minLength; i < c; i++) {
                        if (JSON.stringify(state.activeComponentIdentifierArray[i]) !== JSON.stringify(componentIdent[i])) {
                            return false
                        }
                    }
                    console.log("active", state.activeComponentIdentifierArray.length, componentIdent.length, state.activeComponentIdentifierArray, componentIdent)
                    return true
                }
            }
            return false
        }
    }
}
