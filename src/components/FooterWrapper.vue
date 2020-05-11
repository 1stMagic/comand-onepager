<template>
    <!-- begin footer -->
    <div class="grid-main-item_footer-wrapper" id="footer_wrapper">
        <footer class="grid-container-create-columns">
            <switch-language/>
            <footer-navigation/>
            <opening-hours/>
            <address-data/>
        </footer>
    </div>
    <!-- end footer -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SwitchLanguage from '@/components/SwitchLanguage.vue';
    import FooterNavigation from '@/components/FooterNavigation.vue';
    import OpeningHours from '@/components/OpeningHours.vue';
    import AddressData from '@/components/AddressData.vue';
    import {ContactData} from '@/types';
    import contactData from '@/assets/address_data.json';

    /* used components */
    @Component({
        components: {
            SwitchLanguage,
            FooterNavigation,
            OpeningHours,
            AddressData
        }
    })
    /* export class */
    export default class FooterWrapper extends Vue {
        data!: ContactData;

        created(): void {
            this.data = contactData as ContactData;
        }
    }

</script>
