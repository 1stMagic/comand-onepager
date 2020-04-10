<template>
     <div class="grid-main-item_header-wrapper editmode_wrapper" id="header_wrapper">
           <header class="grid-container-create-columns">
                <div class="grid-item_logo">
                    <a id="logo" href="./" title="To homepage">
                        <img src="templates/layout/default/template_images/logo.svg" alt="Company logo" />
                    </a>
                </div>
                <navigation-wrapper />
           </header>
     </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavigationWrapper from '@/components/NavigationWrapper'; /* @ == root */

@Component ({
    components: {NavigationWrapper}
})
export default class HeaderWrapper extends Vue {

}
</script>