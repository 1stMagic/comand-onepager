<template>
    <label for="name"><span>{{ label('last_name') }}<sup>*</sup>:</span>
        <input id="name" type="text" autofocus title="Ungültige Zeichen: (keine)" v-bind:placeholder="label('last_name')" v-bind:value="value" v-on:input="onInput" v-on:blur="onBlur">
        <span v-if="error">{{ errorMessage }}</span>
    </label>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseFormControl from "@/components/forms/base/BaseFormControl";

    @Component
    export default class InputSurname extends BaseFormControl {
    }
</script>