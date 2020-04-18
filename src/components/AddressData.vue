<template>
    <div class="grid-item_address">
         <h4>Kontakt</h4>
         <dl>
            <dt>Anschrift:</dt>
            <dd><a href="https://www.google.de/maps/place/" target="_blank" title="Open address in Google Maps&trade;">
                Straßenname Nr.<br />
                PLZ Ortsname</a>
            </dd>
            <dt>Telefon:</dt><dd><a href="tel:" title="Nummer per App anrufen">+49 (0)1234/56789</a></dd>
            <dt>Telefax:</dt><dd>+49 (0)1234/567810</dd>
            <dt>E-Mail:</dt><dd><a href="mailto:" title="E-Mail schreiben">youremail@provider.com</a></dd>
        </dl>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class AddressData extends Vue {

}

</script>