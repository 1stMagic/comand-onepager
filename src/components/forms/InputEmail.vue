<template>
     <label for="email"><span>E-Mail<sup>*</sup>:</span>
         <input pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z]{2,}$" name="email" id="email" type="email" value="" tabindex="9" required minlength="6" maxlength="50" data-input-required="Das Feld darf nicht leer sein!" data-error-message="Bitte geben Sie eine gültige E-Mail-Adresse an!" placeholder="E-Mail" title="Ungültige Zeichen: alle außer a-z, A-Z, -, _, @, .">
     </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class InputEmail extends Vue {

}

</script>