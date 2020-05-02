<template>
    <div v-bind:class="'grid-item_' + widgetClass">
         <h4>{{ widgetHeadline }}</h4>
         <dl class="vard">
            <dt v-if="address">Address:</dt><dd class="street-address" v-if="address" v-html="address">{{ address }}</dd>
            <dt v-if="telephone">Telephone:</dt><dd v-if="telephone"><a v-bind:href="'tel:' + telephone" title="Call number">{{ telephone }}</a></dd>
            <dt v-if="fax">Fax:</dt><dd v-if="fax">{{ fax }}</dd>
            <dt v-if="email">E-Mail:</dt><dd class="email" v-if="email"><a v-bind:href="'mailto:' + email" title="Send E-Mail">{{ email }}</a></dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import address from '@/assets/address_data.json';

    @Component
    export default class AddressData extends Vue {
        /* initialize class variables to use inside template above */
        widgetHeadline = "";
        widgetClass = "";
        address = "";
        telephone = "";
        fax = "";
        email = "";

        /* assign values from json file to class variables */
        created(): void {
            this.widgetHeadline = address.widgetHeadline;
            this.widgetClass = address.widgetClass;
            this.address = address.address;
            this.telephone = address.telephone;
            this.fax = address.fax;
            this.email = address.email;
        }
    }
</script>