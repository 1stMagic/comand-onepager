import axios from "axios";
import {BaseClient} from "@/api/BaseClient";
import {SlideshowItem, SlideshowImage} from '@/types';

class ImageSliderClient extends BaseClient {
    private static readonly BREAKPOINTS = [
        {maxWidth: 600, path: 'small'},
        {maxWidth: 1023, path: 'medium'}
    ];

    public async getItems(): Promise<SlideshowItem[]> {
        const response = await axios.get(this.getUrl('/slideshow_wrapper.json'));
        const items: SlideshowItem[] = response.data;
        items.forEach(item => this.prepareImages(item));
        return items;
    }

    private prepareImages(item: SlideshowItem): void {
        const images: SlideshowImage[] = [];

        for (let i = 0, c = ImageSliderClient.BREAKPOINTS.length; i < c; i++) {
            images.push({
                maxWidth: ImageSliderClient.BREAKPOINTS[i].maxWidth,
                imgPath: item.imgPath.replace('/large/', `/${ImageSliderClient.BREAKPOINTS[i].path}/`),
                alt: item.alt || '',
                title: item.title || '',
                figcaption: item.figcaption,
                href: item.href || '',
                loaded: false
            });
        }

        images.push({
            imgPath: item.imgPath,
            alt: item.alt || '',
            title: item.title || '',
            figcaption: item.figcaption,
            href: item.href || '',
            loaded: false
        });

        item.images = images;
    }
}

export const imageSliderClient = new ImageSliderClient();
