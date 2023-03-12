import axios from "axios";
import {BaseClient} from "./BaseClient";
class SlideshowClient extends BaseClient {
    async getItems(language) {
        const response = await axios.get(this.getUrl('/slideshow-wrapper-' + language +'.json'))
        return response.data
    }
}
export const imageSliderClient = new SlideshowClient()
