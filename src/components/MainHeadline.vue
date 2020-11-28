<template>
    <div class="section-wrapper" id="main-headline">
        <section>
            <h1>{{ label('title') }}</h1>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";

    @Component
    export default class MainHeadline extends BaseI18nComponent {
    }
</script>

<style lang="scss">
#main-headline{
    padding: calc(var(--default-padding) * 5) 0;

    h1 {
        font-size: 5rem;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 0;
    }
}
</style>