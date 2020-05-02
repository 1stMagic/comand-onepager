import {Vue} from "vue-property-decorator";
import {LanguageLabels} from "@/types";

export default class BaseI18nComponent extends Vue {
    get labels(): LanguageLabels {
        return this.$store.getters.labels;
    }

    get languages(): string[] {
        return this.$store.state.languages;
    }

    get currentLanguage(): string {
        return this.$store.state.currentLanguage;
    }

    label(name: string): string {
        if (this.labels[name] === undefined) {
            return `labels.${name}`;
        }
        return this.labels[name];
    }
}
