import {mapState} from "pinia"
import {usePiniaStore} from "../../stores/pinia"

export default {
    computed: {
        ...mapState(usePiniaStore, ["labels", "languages", "currentLanguage"])
    },
    methods: {
        label(name) {
            if (this.labels[name] === undefined) {
                return `labels.${name}`
            }
            return this.labels[name]
        }
    }
}
