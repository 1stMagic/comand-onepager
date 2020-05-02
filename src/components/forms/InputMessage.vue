<template>
    <label class="textarea" for="message"><span>{{ label('message') }}<sup>*</sup>:</span>
        <textarea id="message" minlength="2" maxlength="500" title="Ungültige Zeichen: (keine)" v-bind:value="value" v-on:input="onInput" v-on:blur="onBlur" v-bind:placeholder="label('message')"></textarea>
        <span v-if="error">{{ errorMessage }}</span>
    </label>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseFormControl from "@/components/forms/base/BaseFormControl";

    @Component
    export default class InputMessage extends BaseFormControl {
    }
</script>