<template>
    <div v-bind:class="'grid-item_' + widgetClass">
        <h4>{{ label('headline_opening_hours') }}</h4>
        <dl>
            <template v-for="day in days">
                <dt v-bind:key="day.day + '_dt'">{{ label(day.day) }}:</dt><dd v-bind:key="day.day + '_dd'">{{ day.fromTime }}&ndash;{{ day.tillTime }}</dd>
            </template>
        </dl>
        <p>{{ label('opening_hours_exceptions') }}</p>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {OpeningHoursDay} from '@/types';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";
    import openingHours from '@/assets/opening_hours.json';

    @Component
    export default class OpeningHours extends BaseI18nComponent {
        /* initialize class variables to use inside template above */
        days: OpeningHoursDay[] = [];
        widgetClass = "";

        /* assign values from json file to class variables */
        created(): void {
            this.days = openingHours.days;
            this.widgetClass = openingHours.widgetClass;
        }
    }
</script>
