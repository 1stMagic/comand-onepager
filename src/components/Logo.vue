<template>
    <div class="grid-item-logo">
        <a id="logo" href="./" title="To homepage">
            <img src="../assets/images/logo.svg" alt="Company logo"/>
        </a>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Logo extends Vue {

    }
</script>

<style lang="scss">
.grid-item-logo {
    grid-area: logo;
    align-self: center;

    #logo {
        display: block;

        img {
            max-height: 15rem;
        }

        @media only screen and (max-width: 1023px) {
            img {
                max-width: 100%;
                max-height: none;
            }
        }
    }
}
</style>