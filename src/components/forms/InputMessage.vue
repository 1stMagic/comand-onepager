<template>
    <label class="textarea" for="message" :class="{error: error}"><span>{{ label('message') }}<sup>*</sup>:</span>
        <textarea :class="{error: error}" id="message" minlength="2" maxlength="500" v-bind:value="value" v-on:input="onInput" v-on:blur="onBlur" v-bind:placeholder="label('message')"></textarea>
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