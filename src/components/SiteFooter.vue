<template>
    <!-- begin footer -->
    <div class="width-limitation-wrapper grid-main-item-footer-wrapper" id="site-footer">
        <footer class="grid-container-create-columns">
            <cmd-switch-language :languages="languages" @click="changeLanguage" />
            <cmd-footer-navigation :footerNavigation="footerNavigation" headline="Links" />
            <cmd-opening-hours :openingHours="openingHours" headline="Opening hours" textOpenClosed="Momentan geschlossen!" textHolidaysClosed="Feiertags geschlossen" textMiscInfo="Sonstige Angaben kommen hierhin" />
            <cmd-address-data :addressData="addressData" headline="Contact" />
        </footer>
    </div>
    <!-- end footer -->
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CmdSwitchLanguage} from 'comand-ui-kit'
    import {CmdFooterNavigation} from 'comand-ui-kit'
    import {CmdOpeningHours} from 'comand-ui-kit'
    import {CmdAddressData} from 'comand-ui-kit'

    import languages from '@/assets/data/languages.json';
    import footerNavigation from '@/assets/data/footer-navigation.json';
    import addressData from '@/assets/data/address-data.json';
    import openingHours from '@/assets/data/opening-hours.json';

    /* used components */
    @Component({
        components: {
            CmdSwitchLanguage,
            CmdFooterNavigation,
            CmdOpeningHours,
            CmdAddressData
        },
        data () {
            return {
                languages,
                footerNavigation,
                openingHours,
                addressData
            }
        },
        methods: {
            changeLanguage() {
                this.$store.dispatch("loadSections"); // load action from store
            }
        }
    })
    /* export class */
    export default class FooterWrapper extends Vue {
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