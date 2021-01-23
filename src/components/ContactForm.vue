<template>
    <div class="width-limitation-wrapper">
        <a id="anchor-section4"></a>
        <section>
            <h2>{{ label('form_headline') }}</h2>
            <form :action="formAction" v-on:submit="onSubmit" novalidate="novalidate">
                <div class="fieldset grid-container-create-columns">
                    <div class="input-wrapper">
                        <CmdFormElement element="input" type="radio"
                                     :labelText="label('salutation_male')"
                                     name="salutation"
                                     inputValue="M"
                                     v-model="formData.salutation"
                                     @validate="onValidate" />

                        <CmdFormElement element="input" type="radio"
                                     :labelText="label('salutation_female')"
                                     name="salutation"
                                     v-model="formData.salutation"
                                     @validate="onValidate" />
                    </div>
                    <div class="flex-container-with-gap">
                        <CmdFormElement element="input" type="text"
                                        iconClass="icon-user-profile"
                                      :labelText="label('last_name')"
                                      :tooltipText="formData.surname.error ? formData.surname.errorMessage :  'Type your surname!'"
                                      required="required"
                                      :placeholder="label('last_name')"
                                      v-model="formData.surname.value"
                                      :status="formData.surname.error ? 'error' : ''"
                                      @validate="onValidate" />

                        <CmdFormElement element="input" type="email"
                                        iconClass="icon-mail"
                                      :labelText="label('email')"
                                      :placeholder="label('email')"
                                      required="required"
                                      v-model="formData.email.value"
                                      :status="formData.email.error ? 'error' : ''"
                                      :tooltipText="formData.email.error ? formData.email.errorMessage :  'Type your email!'"
                                      @validate="onValidate" />
                    </div>
                    <CmdFormElement element="textarea"
                                  :labelText="label('message')"
                                  :placeholder="label('message')"
                                  required="required"
                                  v-model="formData.message.value"
                                  :status="formData.message.error ? 'error' : ''"
                                    :tooltipText="formData.message.error ? formData.message.errorMessage :  'Type your message!'"
                                  @validate="onValidate" />

                    <CmdFormElement element="input" type="checkbox"
                                  v-model="formData.privacy.value"
                                  :status="formData.privacy.error ? 'error' : ''"
                                 @validate="onValidate">
                        <span v-html="label('data_privacy')"></span>
                        <!-- I accept handling and saving of my personal data a mentioned in the <a href="/content/data-privacy-en.html" @click.prevent="openDataPrivacy($event.target.href)">private policy</a>.-->
                    </CmdFormElement>
                </div>
                <div class="button-wrapper">
                    <CmdFormElement element="button" type="submit" :buttonText="label('submit')" :buttonIcon="{iconClass : 'icon-check', iconPosition: 'before'}" />
                </div>
            </form>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import { CmdFormElement } from 'comand-ui-kit'
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";
    import {ContactFormData} from "@/types";
    import {ContactFormValidator} from "@/util/ContactFormValidator";
    import { openFancyBox } from 'comand-ui-kit'

    @Component ({
        components: {
            CmdFormElement
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

        private mounted() {
            this.labelsChanged()
        }

        private onSubmit(e: Event): void {
            this.onValidate();

            this.formData = Object.assign({}, this.validator.validatePrivacy(this.formData));
    console.log(this.formData)
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

        private openDataPrivacy (url: string): void {
            openFancyBox({url})
        }

        @Watch('$store.state.currentLanguage')
        private languageChanged(): void {
            this.formData = Object.assign({}, {
              salutation: 'M',
              surname: {value: ''},
              email: {value: ''},
              message: {value: ''},
              privacy: {value: false}
            } as ContactFormData);
            this.labelsChanged()
        }

        @Watch('$store.state.labels')
        private labelsChanged(): void {
            this.$nextTick(() => {
                this.$el.querySelectorAll('.fancybox').forEach(link => link.addEventListener('click', e => {
                    e.preventDefault()
                    this.openDataPrivacy(link.getAttribute('href'))
                }))
            })
        }
    }
</script>

