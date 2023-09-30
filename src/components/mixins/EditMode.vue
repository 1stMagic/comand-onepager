<script>
import {findEditComponentWrapper} from "../../utils/editmode.js"

export default {
    inject: {
        editModeContext: {
            default: null
        }
    },
    props: {
        componentPath: {
            type: Array
        }
    },
    data() {
        return {
            editing: false
        }
    },
    mounted() {
        this.initializeEditMode()
    },
    methods: {
        customInitializeEditMode() {
            return false
        },
        initializeEditMode() {
            if (this.customInitializeEditMode()) {
                return
            }
            const editComponentWrapper = findEditComponentWrapper(this.$parent);
            if (editComponentWrapper) {
                editComponentWrapper.addEditStateListener(editing => this.editing = editing)
                editComponentWrapper.addUpdateHandlerProvider(this.updateHandlerProvider)
                editComponentWrapper.setAddHandlerProvider(this.addHandlerProvider)
            }
        },
        updateHandlerProvider() {
            return {}
        }
    }
}
</script>
