<template>
    <label class="inline" for="salutation">
        <span>{{ label('salutation') }}<sup>*</sup>:</span>
        <div class="input_wrapper">
            <label for="male">
                <input type="radio" id="male" value="M" v-on:input="onInput" v-bind:checked="value === 'M'" />
                <span>{{ label('salutation_male') }}</span>
            </label>
            <label for="female">
                <input type="radio" id="female" value="F" @input="onInput" :checked="value === 'F'" />
                <span>{{ label('salutation_female') }}</span>
            </label>
        </div>
    </label>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseFormControl from "@/components/forms/base/BaseFormControl";

@Component
export default class InputSalutation extends BaseFormControl {
}

</script>