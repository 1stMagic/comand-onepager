import {ContactFormData, FormValidator, ValidationResult} from "@/types";

class ContactFormValidator implements FormValidator<ContactFormData> {
    private static readonly PATTERN_SURNAME = /^[a-züöäßáéíóàèìòêîô '-]+$/i;
    private static readonly PATTERN_EMAIL = /^[a-z\d._%+-]+@[a-z\d._%+-]+\.[a-z]{2,}$/i;
    private static readonly PATTERN_MESSAGE = /^.{2,500}$/;

    private readonly label: (name: string) => string;

    public constructor(label: (name: string) => string) {
        this.label = label;
    }

    public validate(formData: ContactFormData): ContactFormData {
        [formData.surname.error, formData.surname.errorMessage] = this.validateRequired(
            formData.surname.value, ContactFormValidator.PATTERN_SURNAME, this.label('form_error_invalid_surname'));
        [formData.email.error, formData.email.errorMessage] = this.validateRequired(
            formData.email.value, ContactFormValidator.PATTERN_EMAIL, this.label('form_error_invalid_email'));
        [formData.message.error, formData.message.errorMessage] = this.validateRequired(
            formData.message.value, ContactFormValidator.PATTERN_MESSAGE, this.label('form_error_invalid_message'));
        formData.privacy.error = false;
        formData.error = formData.surname.error
            || formData.email.error
            || formData.message.error;
        return formData;
    }

    public validatePrivacy(formData: ContactFormData): ContactFormData {
        formData.privacy.error = !formData.privacy.value;
        formData.privacy.errorMessage = formData.privacy.error ? this.label('form_error_missing_privacy_consent') : '';
        formData.error = formData.error || formData.privacy.error;
        return formData;
    }

    private validateRequired(value: string, pattern?: RegExp, errorMessage?: string): ValidationResult {
        if (!value || value.trim().length === 0) {
            return [true, this.label('form_error_empty')];
        }
        if (pattern && !pattern.test(value)) {
            return [true, errorMessage || this.label('form_error_invalid')];
        }
        return [false, ''];
    }
}

export { ContactFormValidator }
