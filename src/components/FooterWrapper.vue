<template>
    <!-- begin footer -->
    <div class="grid-main-item_footer-wrapper" id="footer_wrapper">
        <footer class="grid-container-create-columns">
            <footer-navigation />
            <opening-hours />
            <address-data />


        </footer>
    </div>
    <!-- end footer -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FooterNavigation from '@/components/FooterNavigation.vue';
import OpeningHours from '@/components/OpeningHours.vue';
import AddressData from '@/components/AddressData.vue';

/* used components */
@Component ({
    components: {
        FooterNavigation,
        OpeningHours,
        AddressData
    }
})

/* export class */
export default class FooterWrapper extends Vue {

}

</script>