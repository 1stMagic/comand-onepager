<template>
     <!-- begin page_wrapper -->
      <div id="page_wrapper">
            <a id="anchor_back_to_top_wrapper"></a>
            <!-- begin outer_wrapper -->
            <div class="grid-main-container" id="outer_wrapper">
                <header-wrapper />
                <!-- begin back_to_top_wrapper -->
                <a id="back_to_top_wrapper" href="#anchor_back_to_top_wrapper" title="" class="icon-arrow_close" style="display: none;"></a>
                <!-- end back_to_top_wrapper -->
            </div>
            <!-- end outer_wrapper -->
       </div>
        <!-- end page_wrapper -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HeaderWrapper from '@/components/HeaderWrapper'; /* @ == root */

@Component ({
    components: {HeaderWrapper}
})
export default class App extends Vue {

}

</script>