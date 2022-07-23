export default {
    computed: {
        labels() {
            return {} //this.$store.getters.labels
        },
        languages() {
            return [] //this.$store.state.languages
        },
        currentLanguage() {
            return "de" //this.$store.state.currentLanguage
        }
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
