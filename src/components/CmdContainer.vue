<template>
    <div class="cmd-container">
        <slot></slot>
    </div>
</template>
<script>
import {useEditModeContext} from "../editmode/editModeContext.js";

export default {
    name: "CmdContainer",
    provide() {
        return {
            editModeContext: this.context
        }
    },
    inject: {
        editModeContext: {
            default: null
        }
    },
    props: {
        editModeContextData: {
            type: Object
        }
    },
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {}, this.onSave, this.onDelete)
        }
    },
    methods: {
        onSave(data) {
            console.log("CmdContainer.save()", data)
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                }
            }
        },
        onDelete(data) {
            const result = {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                }
            }
            // if (data && data.length > 0) {
            //     const imageIndex = data[0].editModeContextData.imageIndex
            //     result.delete = (props) => props.images.splice(imageIndex, 1)
            // }
            return result
        }
    }
}
</script>