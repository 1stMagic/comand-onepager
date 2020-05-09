<template>
     <label for="email" :class="{error: error}"><span>{{ label('email') }}<sup>*</sup>:</span>
         <input :class="{error: error}" id="email" type="email" minlength="6" maxlength="50" v-bind:value="value" v-on:input="onInput" v-on:blur="onBlur" v-bind:placeholder="label('email')">
         <span v-if="error">{{ errorMessage }}</span>
     </label>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseFormControl from "@/components/forms/base/BaseFormControl";

    @Component
    export default class InputEmail extends BaseFormControl {
    }
</script>