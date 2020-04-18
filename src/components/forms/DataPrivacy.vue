<template>
    <label for="data_privacy">
        <input name="data_privacy" id="data_privacy" type="checkbox" tabindex="13">
        <span>Ich stimme der Verarbeitung und Speicherung von personenbezogenen Daten gemäß  <a href="#" data-fancybox-content-url="/content/datenschutzerklaerung.html #page_content" class="fancybox" data-fancybox="#fancybox" data-fancybox-controls="close,print">Datenschutzerklärung</a> zu.</span>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class DataPrivacy extends Vue {

}

</script>