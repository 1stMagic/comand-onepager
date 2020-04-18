<template>
    <div class="button_wrapper">
     <small><sup>*</sup>Pflichtangaben</small>
     <button type="submit" name="send_message" id="send_message_4">
         <span class="icon-send_message"></span><span>Abschicken</span>
     </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import Languages from '@/language'

@Component
export default class FormSubmit extends Vue {

}

</script>