function findEditComponentWrapper(component) {
    return findParentComponent(component, "EditComponentWrapper")
}

function findEditSettingsComponentWrapper(component) {
    return findParentComponent(component, "EditModeComponentSettingsWrapper")
}

function findParentComponent(component, parentComponentName) {
    if (component?.$options?.name === parentComponentName) {
        return component
    }
    if (component?.$parent) {
        return findParentComponent(component.$parent, parentComponentName)
    }
    return null
}

function buildComponentPath(component, ...extraPathElements) {
    const path = []
    for (let parent = findEditComponentWrapper(component); parent; parent = findEditComponentWrapper(parent.$parent)) {
        if (parent.componentPath) {
            path.unshift(...parent.componentPath);
        }
    }
    path.push(...extraPathElements)
    return path
}

function componentPathAsString(componentPath) {
    if (Array.isArray(componentPath) && componentPath.length > 0) {
        return JSON.stringify(componentPath)
    }
    return ""
}

function updateHandlerProvider(component, options) {
    if (component?.$options?.name) {
        return {
            name: component.$options.name,
            ...options
        }
    }
    return options
}

export {
    findEditComponentWrapper,
    findEditSettingsComponentWrapper,
    buildComponentPath,
    componentPathAsString,
    updateHandlerProvider
}
