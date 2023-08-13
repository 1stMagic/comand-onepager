<template>
    <!-- begin cmdHeadline -->
    <CmdHeadlineSettings
            ref="headlineSettings"
            v-bind="cmdHeadline || {}"
    />
    <!-- end cmdHeadline -->
    <hr />
    <CmdFormElement
            element="input"
            type="text"
            labelText="Receiver E-Mail-Address"
            placeholder="Receiver E-Mail-Address"
            v-model="emailAddressModel"
    />
</template>

<script>
export default {
    name: "ContactFormSettings",
    inheritAttrs: false,
    data() {
        return {
            editableEmailAddress: null
        }
    },
    props: {
        emailAddress: {
            type: String,
            default: ""
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        emailAddressModel: {
            get() {
                return this.editableEmailAddress == null ? this.emailAddress : this.editableEmailAddress
            },
            set(value) {
                this.editableEmailAddress = value
            }
        }
    },
    // methods: {
    //     save(editModeContextData) {
    //         const headlineData = this.$refs.headlineSettings.save(editModeContextData)
    //         const data = {
    //             cmdHeadline: {
    //                 headlineText: headlineData.headlineText,
    //                 headlineLevel: headlineData.headlineLevel,
    //                 textAlign: headlineData.textAlign
    //             },
    //             // emailAddress: this.emailAddressModel
    //         }
    //         return {
    //             editModeContextData,
    //             ...data,
    //             update(props) {
    //                 props.cmdHeadline.headlineText = data.cmdHeadline.headlineText
    //                 props.cmdHeadline.headlineLevel = data.cmdHeadline.headlineLevel
    //                 props.cmdHeadline.textAlign = data.cmdHeadline.textAlign
    //                 // props.emailAddress = data.emailAddress
    //             }
    //         }
    //     }
    // }
}
</script>

<style scoped>

</style>
