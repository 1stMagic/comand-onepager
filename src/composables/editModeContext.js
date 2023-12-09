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
        updateContent(componentPath, updateHandler) {
            store.updateContent(componentPath, [{update: updateHandler}])
        },
        deleteContent(componentPath) {
            store.deleteContent(componentPath)
        }
    }
}

function settingsActions(state) {
    return {
        startEditing(componentIdentifier, componentName, componentProps, allowedContentTypes, componentPath, saveHandler, deleteInnerComponent, activeTab) {
            state.settingsEditing = componentIdentifier
            state.componentName = componentName
            state.componentProps = componentProps
            state.allowedContentTypes = allowedContentTypes
            state.componentPath = componentPath
            state.settingsSaveHandler = saveHandler
            state.deleteInnerComponent = deleteInnerComponent
            state.activeTab = activeTab
        },
        isEditing(componentIdentifier) {
            if (componentIdentifier) {
                return state.settingsEditing === componentIdentifier
            }
            return !!state.settingsEditing
        },
        stopEditing() {
            state.settingsEditing = null
            state.componentName = null
            state.componentProps = null
            state.settingsSaveHandler = null
            state.deleteInnerComponent = null
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
        },
        getDeleteInnerComponent() {
            return state.deleteInnerComponent
        },
        getActiveTab() {
            return state.activeTab
        }
    }
}

function systemActions(state) {
    return {
        setActiveComponent(parentComponentPath, childComponentPath) {
            if (parentComponentPath.length === 0) {
                parentComponentPath = childComponentPath
                childComponentPath = []
            }
            const componentIdentifier = JSON.stringify(parentComponentPath)
            if (state.activeComponentIdentifier !== componentIdentifier) {
                state.contentEditing = null
            }
            state.activeComponentIdentifier = componentIdentifier
            state.activeComponentPath = parentComponentPath
            state.activeChildComponentIdentifier = JSON.stringify(childComponentPath)
            state.activeChildComponentPath = childComponentPath
            state.activeSectionPath = null
        },
        isActiveComponent(componentPath) {
            return state.activeComponentIdentifier === JSON.stringify(componentPath)
        },
        isActiveChildComponent(componentPath) {
            return state.activeChildComponentIdentifier === JSON.stringify(componentPath)
        },
        setActiveSection(sectionPath) {
            // deactivate edit-mode for inner components if section is selected
            state.contentEditing = null
            state.activeComponentIdentifier = null
            state.activeComponentPath = null
            state.activeChildComponentIdentifier = null
            state.activeChildComponentPath = null

            // set state for active section-path
            state.activeSectionPath = JSON.stringify(sectionPath)
        },
        isActiveSection(sectionPath) {
            // check if given sectionPath equals existing one to set active-state
            return state.activeSectionPath === JSON.stringify(sectionPath)
        }
    }
}
