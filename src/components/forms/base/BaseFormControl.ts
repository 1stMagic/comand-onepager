import {Component, Emit, Prop} from 'vue-property-decorator';
import BaseI18nComponent from "@/components/base/BaseI18nComponent";

@Component
export default class BaseFormControl extends BaseI18nComponent {
    @Prop({ default: '' }) private value!: string;
    @Prop({ default: false }) private error!: boolean;
    @Prop({ default: '' }) private errorMessage!: string;

    @Emit('input')
    public onInput(event: Event): string | boolean {
        const el = event.target as HTMLInputElement;
        if (el.type == 'checkbox') {
            return el.checked;
        }
        return el.value;
    }

    @Emit('validate')
    public onBlur(): void {
        // Empty
    }
}
