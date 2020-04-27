<template>
    <div class="section_wrapper" id="headline_wrapper">
        <a v-bind:id="'anchor_' + id"></a>
        <section>
                <h1>{{ headline }}</h1>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mainHeadline from '@/assets/main_headline.json';

@Component
export default class MainHeadline extends Vue {
        /* initialize class variables to use inside template above */
        id = "";
        headline = "";

        /* assign values from json file to class variables */
        created(): void {
            this.id = mainHeadline.id;
            this.headline = mainHeadline.headline;
        }
}
</script>