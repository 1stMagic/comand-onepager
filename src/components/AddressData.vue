<template>
    <div v-bind:class="'grid-item_' + widgetClass">
         <h4>{{ widgetHeadline }}</h4>
         <dl>
            <dt v-if="address">Anschrift:</dt><dd v-if="address"><a v-bind:href="'mailto:' + email" title="E-Mail schreiben">{{ email }}</a></dd>
            <dt v-if="telephone">Telephone:</dt><dd v-if="telephone"><a v-bind:href="'mailto:' + email" title="E-Mail schreiben">{{ email }}</a></dd>
            <dt v-if="fax">Fax:</dt><dd v-if="fax"><a v-bind:href="'mailto:' + email" title="E-Mail schreiben">{{ email }}</a></dd>
            <dt v-if="email">E-Mail:</dt><dd v-if="email"><a v-bind:href="'mailto:' + email" title="E-Mail schreiben">{{ email }}</a></dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import address from '@/assets/address_data.json';

    @Component
    export default class AddressData extends Vue {
        /* initialize class variables to use inside template above */
        headline = "";
        addressClass = "";
        address = "";
        telephone = "";
        fax = "";
        email = "";

        /* asign values from json file to class variables */
        created(): void {
            this.headline = address.headline;
            this.addressClass = address.addressClass;
            this.address = address.address;
            this.telephone = address.telephone;
            this.fax = address.fax;
            this.email = address.email;
        }
    }
</script>