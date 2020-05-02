export abstract class BaseClient {
    private static readonly BASE_URL = `${process.env.BASE_URL}templates/pages/data`;

    protected getUrl(path: string): string {
        return `${BaseClient.BASE_URL}${path}`;
    }
}
