<template>
    <label for="name"><span>Nachname<sup>*</sup>:</span>
        <input name="name" id="name" type="text" value="" tabindex="3" autofocus required minlength="2" maxlength="50" data-input-required="Das Feld darf nicht leer sein!" data-error-message="Das Feld darf nur Buchstaben und Bindestriche enthalten!" placeholder="Nachname" title="Ungültige Zeichen: (keine)" pattern="^[A-Za-züöäÜÖÄßáéíóàèìòêîôÁÉÍÓÀÈÌÒÂÊÎÔ '-]*$">
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class InputSurname extends Vue {

}

</script>