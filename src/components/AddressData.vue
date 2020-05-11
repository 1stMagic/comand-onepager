<template>
    <div v-bind:class="'grid-item_' + widgetClass">
        <h4>{{ label('headline_address') }}</h4>
        <dl class="vard">
            <dt v-if="address">{{ label('address') }}:</dt>
            <dd class="street-address" v-if="address" v-html="address">{{ address }}</dd>
            <dt v-if="telephone">{{ label('telephone') }}:</dt>
            <dd v-if="telephone"><a v-bind:href="'tel:' + telephone" title="Call number">{{ telephone }}</a></dd>
            <dt v-if="fax">{{ label('fax') }}:</dt>
            <dd v-if="fax">{{ fax }}</dd>
            <dt v-if="email">{{ label('email') }}:</dt>
            <dd class="email" v-if="email"><a v-bind:href="'mailto:' + email">{{ email }}</a></dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseI18nComponent from "@/components/base/BaseI18nComponent";
    import address from '@/assets/address_data.json';

    @Component
    export default class AddressData extends BaseI18nComponent {
        /* initialize class variables to use inside template above */
        widgetClass = "";
        address = "";
        telephone = "";
        fax = "";
        email = "";

        /* assign values from json file to class variables */
        created(): void {
            this.widgetClass = address.widgetClass;
            this.address = address.address;
            this.telephone = address.telephone;
            this.fax = address.fax;
            this.email = address.email;
        }
    }
</script>
