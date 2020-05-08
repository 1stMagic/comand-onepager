<template>
    <label for="data_privacy">
        <input id="data_privacy" type="checkbox" v-bind:value="value" v-on:input="onInput">
        <span v-html="label('data_privacy')"></span>
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