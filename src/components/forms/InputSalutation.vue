<template>
    <label class="inline" for="salutation">
        <span>Anrede<sup>*</sup>:</span>
        <div class="input_wrapper">
            <label for="male">
                <input type="radio" name="salutation" id="male" value="0" checked="checked" />
                <span>Herr</span>
            </label>
            <label for="female">
                <input type="radio" name="salutation" id="female" value="1" />
                <span>Frau</span>
            </label>
        </div>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class InputSalutation extends Vue {

}

</script>