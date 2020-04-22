<template>
    <form>
        <div class="fieldset grid-container-create-columns">
            <input-salutation />
            <div class="grid-container-create-columns" data-columns-large="2">
                <input-surname />
                <input-email />
            </div>
            <input-message />
            <data-privacy />
        </div>
        <form-submit v-on:click="submitForm" />
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputSalutation          from '@/components/forms/InputSalutation.vue';
import InputSurname             from '@/components/forms/InputSurname.vue';
import InputEmail               from '@/components/forms/InputEmail.vue';
import InputMessage             from '@/components/forms/InputMessage.vue';
import DataPrivacy              from '@/components/forms/DataPrivacy.vue';
import FormSubmit               from '@/components/forms/FormSubmit.vue';

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

export default class ContactForm extends Vue {
    /*submitForm() {

    }
    */
}
</script>

