<template>
    <div class="section_wrapper" id="headline_wrapper">
        <section>
                <h1>{{ label('title') }}</h1>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseI18nComponent from "@/components/base/BaseI18nComponent";

@Component
export default class MainHeadline extends BaseI18nComponent {
}
</script>