<template>
    <div v-bind:class="'grid-item_' + widgetClass">
        <h4>{{ widgetHeadline }}</h4>
        <dl data-not-shorten="1">
            <template v-for="day in days">
                <dt v-bind:key="day.day + '_dt'">{{ day.day }}:</dt><dd v-bind:key="day.day + '_dd'">{{ day.fromTime }}&ndash;{{ day.tillTime }}</dd>
            </template>
        </dl>
        <p>samstags, sonntags und feiertags geschlossen!</p>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {OpeningHoursDay} from '@/types';
    import openingHours from '@/assets/opening_hours.json';

    @Component
    export default class OpeningHours extends Vue {
        /* initialize class variables to use inside template above */
        days: OpeningHoursDay[] = [];
        widgetClass = "";
        widgetHeadline = "";

        /* assign values from json file to class variables */
        created(): void {
            this.days = openingHours.days;
            this.widgetClass = openingHours.widgetClass;
            this.widgetHeadline = openingHours.widgetHeadline;
        }
    }
</script>