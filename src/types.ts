type LanguageLabels = { [key: string]: string };
type Labels = { [key: string]: LanguageLabels };
type Gender = 'M' | 'F';
type ValidationResult = [boolean, string];

interface ContentSectionImage {
    imgId: number;
    imgPath: string;
    alt: string;
    figcaption: string;
}

interface ContentSection {
    id: string;
    iconClass: string;
    navEntry: string;
    imgPath?: string;
    headline: string;
    content: string;
    images?: ContentSectionImage[];
}

interface FormData {
    error?: boolean;
}

interface FormDataValue<T> {
    value: T;
    error?: boolean;
    errorMessage?: string;
}

interface ContactFormData extends FormData {
    salutation: Gender;
    surname: FormDataValue<string>;
    email: FormDataValue<string>;
    message: FormDataValue<string>;
    privacy: FormDataValue<boolean>;
}

interface FormValidator<T extends FormData> {
    validate(formData: T): T;
}

interface SlideshowItem {
    imgPath: string;
    alt: string;
    title?: string
    figcaption: string;
    href?: string;
    images?: SlideshowImage[];
}

interface SlideshowImage {
    maxWidth?: number;
    imgPath: string;
    alt?: string;
    title?: string
    figcaption?: string;
    href?: string;
    loaded?: boolean;
}

interface OpeningHoursDay {
    day: string;
    fromTime: string;
    tillTime: string;
}

interface OpeningHoursType {
    widgetClass: string;
    widgetHeadline: string;
    days: OpeningHoursDay[];
}

interface ContactData {
    widgetClass: string;
    widgetHeadline: string;
    address: string;
    telephone: string;
    fax: string;
    email: string;
}

interface FooterNavigationLink {
    name: string;
    href: string;
    target: string;
    fancybox: boolean;
    fancyboxContentURL?: string;
}

interface FooterNavigationType {
    widgetClass: string;
    widgetHeadline: string;
    links: FooterNavigationLink[];
}

export {
    LanguageLabels,
    Labels,
    Gender,
    ValidationResult,
    ContentSection,
    ContentSectionImage,
    FormData,
    ContactFormData,
    FormValidator,
    SlideshowItem,
    SlideshowImage,
    OpeningHoursType,
    OpeningHoursDay,
    ContactData,
    FooterNavigationType,
    FooterNavigationLink
};