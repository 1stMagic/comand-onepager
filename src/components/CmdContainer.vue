<template>
    <div class="cmd-container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "CmdContainer",
    inject: {
        editModeContext: {
            default: null
        }
    },
    // methods: {
    //     onSave(data) {
    //         return {
    //             editModeContextData: {
    //                 ...(this.editModeContextData || {})
    //             }
    //         }
    //     },
    //     onDelete(data) {
    //         const result = {
    //             editModeContextData: {
    //                 ...(this.editModeContextData || {})
    //             }
    //         }
    //         // if (data && data.length > 0) {
    //         //     const imageIndex = data[0].editModeContextData.imageIndex
    //         //     result.delete = (props) => props.images.splice(imageIndex, 1)
    //         // }
    //         return result
    //     }
    // }
}
</script>
