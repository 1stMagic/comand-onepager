<template>
    <label for="data_privacy">
        <input id="data_privacy" type="checkbox" v-bind:value="value" v-on:input="onInput">
        <span>Ich stimme der Verarbeitung und Speicherung von personenbezogenen Daten gemäß  <a href="#" data-fancybox-content-url="/content/datenschutzerklaerung.html #page_content" class="fancybox" data-fancybox="#fancybox" data-fancybox-controls="close,print">Datenschutzerklärung</a> zu.</span>
        <span v-if="error">{{ errorMessage }}</span>
    </label>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseFormControl from "@/components/forms/base/BaseFormControl";

    @Component
    export default class DataPrivacy extends BaseFormControl {
    }
</script>