<template>
    <div class="grid-item_opening-hours">
        <h4>Öffnungszeiten</h4>
        <dl data-not-shorten="1">
            <dt>Montag:</dt><dd>8.00-17.30 Uhr</dd>
            <dt>Dienstag:</dt><dd>8.00-17.30 Uhr</dd>
            <dt>Mittwoch:</dt><dd>8.00-14.00 Uhr</dd>
            <dt>Donnerstag:</dt><dd>8.00-17.30 Uhr</dd>
            <dt>Freitag:</dt><dd>8.00-16.00 Uhr</dd>
        </dl>
        <p>samstags, sonntags und feiertags geschlossen!</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class OpeningHours extends Vue {

}

</script>