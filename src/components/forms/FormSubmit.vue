<template>
    <div class="button_wrapper">
     <small><sup>*</sup>{{ label('mandatory') }}</small>
     <button type="submit">
         <span class="icon-send_message"></span><span>{{ label('send') }}</span>
     </button>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";

    @Component
    export default class FormSubmit extends BaseI18nComponent {
    }
</script>