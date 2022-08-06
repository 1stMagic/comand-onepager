<template>
    <div>
        <h2>{{ label('form_headline') }}</h2>
        <CmdForm :action="formAction" @submit="onSubmit" novalidate="novalidate" :textLegend="label('contact_form.legend')">
            <div class="flex-container no-flex">
                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="radio"
                    :labelText="label('salutation_male')"
                    name="salutation"
                    inputValue="M"
                    v-model="formData.salutation"
                    @validate="onValidate"
                />
                <!-- end cmd-form-element -->

                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="radio"
                    :labelText="label('salutation_female')"
                    name="salutation"
                    v-model="formData.salutation"
                    @validate="onValidate"
                />
                <!-- end cmd-form-element -->
            </div>
            <div class="flex-container">
                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="text"
                    iconClass="icon-user-profile"
                    :labelText="label('last_name')"
                    :tooltipText="formData.surname.error ? formData.surname.errorMessage :  'Type your surname!'"
                    required="required"
                    :placeholder="label('last_name')"
                    v-model="formData.surname.value"
                    :status="formData.surname.error ? 'error' : ''"
                    @validate="onValidate
                    "/>
                <!-- end cmd-form-element -->

                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="email"
                    iconClass="icon-mail"
                    :labelText="label('email')"
                    :placeholder="label('email')"
                    required="required"
                    v-model="formData.email.value"
                    :status="formData.email.error ? 'error' : ''"
                    :tooltipText="formData.email.error ? formData.email.errorMessage :  'Type your email!'"
                    @validate="onValidate"
                />
                <!-- end cmd-form-element -->
            </div>
            <!-- begin cmd-form-element -->
            <CmdFormElement
                element="textarea"
                :labelText="label('message')"
                :placeholder="label('message')"
                required="required"
                v-model="formData.message.value"
                :status="formData.message.error ? 'error' : ''"
                :tooltipText="formData.message.error ? formData.message.errorMessage :  'Type your message!'"
                @validate="onValidate"
            />
            <!-- end cmd-form-element -->

            <!-- begin cmd-form-element -->
            <CmdFormElement
                element="input"
                type="checkbox"
                v-model="formData.privacy.value"
                :status="formData.privacy.error ? 'error' : ''"
                :labelText="label('data_privacy')"
                @validate="onValidate">
                <span v-html="label('data_privacy')"></span>
                <!-- I accept handling and saving of my personal data a mentioned in the <a href="/content/data-privacy-en.html" @click.prevent="openDataPrivacy($event.target.href)">private policy</a>.-->
            </CmdFormElement>
            <!-- end cmd-form-element -->

            <div class="button-wrapper">
                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="button"
                    type="submit"
                    :nativeButton="nativeButton"
                />
                <!-- end cmd-form-element -->
            </div>
        </CmdForm>
    </div>
</template>

<script>
// import components from comand-component-library
import {CmdForm} from 'comand-component-library'
import {CmdFormElement} from 'comand-component-library'

//import {openFancyBox} from 'comand-component-library'
import BaseI18nComponent from "./mixins/BaseI18nComponent"
import {ContactFormValidator} from "../utils/ContactFormValidator"

export default {
    components: {
        CmdForm,
        CmdFormElement
    },
    mixins: [
        BaseI18nComponent
    ],
    data() {
        return {
            validator: new ContactFormValidator(name => this.label(name)),
            formData: {
                salutation: 'M',
                surname: {value: ''},
                email: {value: ''},
                message: {value: ''},
                privacy: {value: false}
            },
            nativeButton: {
                icon: {
                    show: true,
                    iconClass: "icon-message-send",
                },
                text: "Send"
            }
        }
    },
    // mounted() {
    //     this.labelsChanged()
    // },
    props: {
        formAction: {
            type: String,
            required: true
        }
    },
    methods: {
        onSubmit(event) {
            this.onValidate();

            this.formData = Object.assign({}, this.validator.validatePrivacy(this.formData));
            if (this.formData.error) {
                event.preventDefault();
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

            event.preventDefault();
        },
        onValidate() {
            this.formData = Object.assign({}, this.validator.validate(this.formData));
        }
        // openDataPrivacy(url) {
        //     openFancyBox({url})
        // }
    }
}

// @Watch('$store.state.currentLanguage')
// private languageChanged(): void {
//     this.formData = Object.assign({}, {
//       salutation: 'M',
//       surname: {value: ''},
//       email: {value: ''},
//       message: {value: ''},
//       privacy: {value: false}
//     } as ContactFormData);
//     this.labelsChanged()
// }
//
// @Watch('$store.state.labels')
// private labelsChanged(): void {
//     this.$nextTick(() => {
//         this.$el.querySelectorAll('.fancybox').forEach(link => link.addEventListener('click', e => {
//             e.preventDefault()
//             this.openDataPrivacy(link.getAttribute('href'))
//         }))
//     })
// }
</script>

