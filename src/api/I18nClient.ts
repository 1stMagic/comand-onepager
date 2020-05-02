import axios from "axios";
import {Labels} from "@/types";
import {BaseClient} from "@/api/BaseClient";

class I18nClient extends BaseClient {
    public async getLanguagesAndLabels(): Promise<[string[], Labels]> {
        const response = await axios.get(this.getUrl('/languages.json'));
        const labels: Labels = response.data;
        const languages: string[] = [];

        for (const language in labels) {
            if (Object.prototype.hasOwnProperty.call(labels, language)) {
                languages.push(language);
            }
        }

        return [languages, labels];
    }
}

export const i18nClient = new I18nClient();
