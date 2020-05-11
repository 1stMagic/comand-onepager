<template>
    <div class="section_wrapper">
        <a id="anchor_section4"></a>
        <section>
            <h2>{{ label('form_headline') }}</h2>
            <form v-bind:action="formAction" v-on:submit="onSubmit">
                <div class="fieldset grid-container-create-columns">
                    <input-salutation v-model="formData.salutation" />
                    <div class="grid-container-create-columns" data-columns-large="2">
                        <input-surname v-model="formData.surname.value" :error="formData.surname.error" :error-message="formData.surname.errorMessage" @validate="onValidate" />
                        <input-email v-model="formData.email.value" :error="formData.email.error" :error-message="formData.email.errorMessage" @validate="onValidate" />
                    </div>
                    <input-message v-model="formData.message.value" :error="formData.message.error" :error-message="formData.message.errorMessage" @validate="onValidate" />
                    <data-privacy v-model="formData.privacy.value" :error="formData.privacy.error" :error-message="formData.privacy.errorMessage" @validate="onValidate" />
                </div>
                <form-submit />
            </form>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import InputSalutation          from '@/components/forms/InputSalutation.vue';
    import InputSurname             from '@/components/forms/InputSurname.vue';
    import InputEmail               from '@/components/forms/InputEmail.vue';
    import InputMessage             from '@/components/forms/InputMessage.vue';
    import DataPrivacy              from '@/components/forms/DataPrivacy.vue';
    import FormSubmit               from '@/components/forms/FormSubmit.vue';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";
    import {ContactFormData} from "@/types";
    import {ContactFormValidator} from "@/util/ContactFormValidator";

    @Component ({
        components: {
            InputSalutation,
            InputSurname,
            InputEmail,
            InputMessage,
            DataPrivacy,
            FormSubmit
        }
    })
    export default class ContactForm extends BaseI18nComponent {
        @Prop({ required: true }) private readonly formAction!: string;

        private validator = new ContactFormValidator(name => this.label(name));
        private formData: ContactFormData = {
            salutation: 'M',
            surname: {value: ''},
            email: {value: ''},
            message: {value: ''},
            privacy: {value: false}
        };

        private onSubmit(e: Event): void {
            this.onValidate();

            this.formData = Object.assign({}, this.validator.validatePrivacy(this.formData));

            if (this.formData.error) {
                e.preventDefault();
                return;
            }

            alert(`
Form submit:
    salutation: ${this.formData.salutation}
    surname: ${this.formData.surname.value}
    email: ${this.formData.email.value}
    message: ${this.formData.message.value}
    privacy: ${this.formData.privacy.value}
            `);

            e.preventDefault();
        }

        private onValidate(): void {
            this.formData = Object.assign({}, this.validator.validate(this.formData));
        }

        @Watch('$store.state.currentLanguage')
        private languageChanged(): void {
            this.formData = Object.assign({}, {
              salutation: 'M',
              surname: {value: ''},
              email: {value: ''},
              message: {value: ''},
              privacy: {value: false}
          });
        }
    }
</script>

