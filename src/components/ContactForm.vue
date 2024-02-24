<template>
    <div class="contact-form">
        <!-- begin CmdHeadline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext?.editing"
            v-bind="cmdHeadline || {}"
        />
        <!-- end CmdHeadline -->

        <CmdForm :action="formAction" @submit="onSubmit" novalidate="novalidate"
                 :textLegend="label('contact_form.legend')">
            <div class="flex-container no-flex">
                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="radio"
                    :labelText="label('contact_form.salutation_male')"
                    name="salutation"
                    inputValue="M"
                    :replace-input-type="true"
                    v-model="formData.salutation"
                    @validate="onValidate"
                />
                <!-- end cmd-form-element -->

                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="radio"
                    :labelText="label('contact_form.salutation_female')"
                    name="salutation"
                    :replace-input-type="true"
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
                    :labelText="label('contact_form.last_name')"
                    :tooltipText="formData.surname.error ? formData.surname.errorMessage :  'Type your surname!'"
                    required="required"
                    :placeholder="label('contact_form.last_name')"
                    v-model="formData.surname.value"
                    :status="formData.surname.error ? 'error' : ''"
                    @validate="onValidate"
                />
                <!-- end cmd-form-element -->

                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="input"
                    type="email"
                    iconClass="icon-mail"
                    :labelText="label('contact_form.email')"
                    :placeholder="label('contact_form.email')"
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
                :labelText="label('contact_form.message')"
                :placeholder="label('contact_form.message')"
                required="required"
                v-model="formData.message.value"
                :status="formData.message.error ? 'error' : ''"
                :tooltipText="formData.message.error ? formData.message.errorMessage :  'Type your message!'"
                :textCharacters="label('contact_form.characters')"
                @validate="onValidate"
            />
            <!-- end cmd-form-element -->

            <!-- begin cmd-form-element -->
            <CmdFormElement
                element="input"
                type="checkbox"
                :required="true"
                v-model="formData.privacy.value"
                :status="formData.privacy.error ? 'error' : ''"
                @validate="onValidate">
                <template v-slot:labeltext>
                    <span ref="dataPrivacy" v-html="label('contact_form.data_privacy')"></span>
                </template>
            </CmdFormElement>
            <!-- end cmd-form-element -->

            <div class="button-wrapper">
                <!-- begin cmd-form-element -->
                <CmdFormElement
                    element="button"
                    type="submit"
                    :nativeButton="nativeButtonTranslated"
                />
                <!-- end cmd-form-element -->
            </div>
        </CmdForm>
    </div>
</template>

<script>
// import components from comand-component-library
import {CmdForm, CmdFormElement, CmdHeadline, openFancyBox} from 'comand-component-library'

// import functions
import {ContactFormValidator} from "../utils/ContactFormValidator"

// import store
import {usePiniaStore} from "../stores/pinia"

// import mixins
import BaseI18nComponent from "./mixins/BaseI18nComponent"

export default {
    components: {
        CmdForm,
        CmdFormElement,
        CmdHeadline
    },
    mixins: [
        BaseI18nComponent
    ],
    inject: {
        editModeContext: {
            default: null
        }
    },
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
    props: {
        receiverEmailAddress: {
            type: String,
            default: ""
        },
        formAction: {
            type: String,
            required: true
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    mounted() {
        usePiniaStore().$subscribe(() => {
            this.$nextTick(() => {
                this.$refs.dataPrivacy?.querySelector('.fancybox')?.addEventListener('click', event => {
                    event.preventDefault()
                    openFancyBox({url: event.target.getAttribute('href')})
                })
            })
        })
    },
    computed: {
        nativeButtonTranslated() {
            return {
                icon: this.nativeButton.icon,
                text: this.label("contact_form.send_message")
            }
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
        },
        executeLink(link, event) {
            if (link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link})
            }
        },
        // onPersist(data) {
        //     return {
        //         editModeContextData: {
        //             ...(this.editModeContextData || {})
        //         },
        //         update(props) {
        //             props.cmdHeadline = {
        //                 ...(props.cmdHeadline || {}),
        //             }
        //             props.cmdHeadline.headlineText = data[0].headlineText
        //         }
        //     }
        // },
        // onDelete() {
        //     console.log("ContactForm.onDelete()")
        //     return {
        //         editModeContextData: {
        //             ...(this.editModeContextData || {})
        //         }
        //     }
        // }
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

<style lang="scss">
.contact-form {
    fieldset {
        margin: 0;
    }
}
</style>

