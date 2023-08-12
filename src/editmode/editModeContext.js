import {ref, watchEffect} from "vue"

export function useEditModeContext(parentContext, props, persistHandler, deleteHandler) {
    const editing = ref(!!parentContext?.editing)
    const saveHandlers = []
    const deleteHandlers = []

    function save() {
        const data = []
        saveHandlers.forEach(saveHandler => {
            const result = saveHandler();
            if (result) {
                data.push(result)
            }
        })
        callPersistHandler(data)
    }

    function deleteComponent() {
        console.log("deleteComponent")
        const data = []
        deleteHandlers.forEach(deleteHandler => {
            const result = deleteHandler();
            if (result) {
                data.push(result)
            }
        })
        callDeleteHandler(data)
    }

    function callPersistHandler(data) {
        let processedData = data
        if (persistHandler) {
            processedData = persistHandler(data)
        }
        if (parentContext && processedData != null) {
            parentContext.callPersistHandler(processedData)
        }
    }

    function callDeleteHandler(data) {
        let processedData = data
        if (deleteHandler) {
            processedData = deleteHandler(data)
        }
        if (parentContext && processedData != null) {
            parentContext.callDeleteHandler(processedData)
        }
    }

    function addSaveHandler(saveHandler) {
        if (!saveHandlers.includes(saveHandler)) {
            saveHandlers.push(saveHandler)
        }
    }
    function addDeleteHandler(deleteHandler) {
        if (!deleteHandlers.includes(deleteHandler)) {
            deleteHandlers.push(deleteHandler)
        }
    }

    if (parentContext) {
        parentContext.addSaveHandler(save)
        parentContext.addDeleteHandler(deleteComponent)
    }

    watchEffect(() => {
        console.log("watch", parentContext?.editing)
        editing.value = !!parentContext?.editing
    });

    return {
        editing,
        props: {
            ...(parentContext?.props || {}),
            ...(props || {})
        },
        addSaveHandler,
        addDeleteHandler,
        save,
        deleteComponent,
        callPersistHandler,
        callDeleteHandler
    }
}
