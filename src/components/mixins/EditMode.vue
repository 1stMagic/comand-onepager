<script>
export default {
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            editing: false
        }
    },
    created() {
        this.editModeContext?.content.watchEditingFlag(editing => this.editing = editing)
        this.editModeContext?.content.addUpdateHandlerProvider(this.updateHandlerProvider)
    },
    methods: {
        updateHandlerProvider() {
            return {}
        }
    }
}
</script>
