<template>
    <!-- begin switch language -->
    <div class="grid-item_language-support">
        <router-link v-for="language in languages" v-bind:to="{name: 'home', params: {lang: language}}" v-bind:key="language" active-class="active" v-bind:class="['flag', language]" v-on:click.prevent="formData.error = false"></router-link>
    </div>
    <!-- end switch language -->
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseI18nComponent from '@/components/base/BaseI18nComponent';

    @Component
    export default class SwitchLanguage extends BaseI18nComponent {
    }
</script>