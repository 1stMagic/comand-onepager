<template>
    <label class="textarea" for="message"><span>Nachricht<sup>*</sup>:</span>
        <textarea name="message" id="message" tabindex="11" required minlength="2" maxlength="500" data-input-required="Das Feld darf nicht leer sein!" placeholder="Nachricht" title="Ungültige Zeichen: (keine)"></textarea>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class InputMessage extends Vue {

}

</script>