<template>
    <!-- begin footer -->
    <div class="grid-main-item-footer-wrapper" id="site-footer">
        <footer class="grid-container-create-columns">
            <switch-language />
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
    import contactData from '@/assets/data/address-data.json';

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

<style lang="scss">
/* >>> begin site-footer */
#site-footer {
    align-self: end;

    footer {
        padding: 0 var(--default-padding);

        h4 {
            color: var(--pure-white);
        }

        address a {
            font-weight: normal;
        }
        a {
            text-decoration: none;

            &:hover, &:active, &:focus {
                text-decoration: underline;
            }
        }

        ul {
            margin-bottom: 0;

            li {
                list-style-type: none;
                margin: 0 0 var(--default-margin) 0;
            }
        }
    }
}
/* >>> end site-footer */
</style>