<template>
    <!-- begin back_to_top_wrapper -->
    <transition name="back_to_top">
        <a id="back_to_top_wrapper" href="#" title="" class="icon-arrow_close" v-on:click.prevent="onBackToTop"
           v-if="show"></a>
    </transition>
    <!-- end back_to_top_wrapper -->
</template>

<style scoped>
    .back_to_top-enter-active, .back_to_top-leave-active,
    .back_to_top-enter, .back_to_top-leave-to {
        transition: var(--default-transition);
        opacity: 1;
    }

    .back_to_top-enter, .back_to_top-leave-to {
        opacity: 0;
    }
</style>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BackToTop extends Vue {
        private windowInnerHeight = window.innerHeight;
        private windowScrollY = window.scrollY;
        private bodyScrollHeight = document.body.scrollHeight;

        private created(): void {
            window.addEventListener('resize', this.onViewportChange);
            window.addEventListener('scroll', this.onViewportChange);
        }

        private destroyed(): void {
            window.removeEventListener('resize', this.onViewportChange);
            window.removeEventListener('scroll', this.onViewportChange);
        }

        get show(): boolean {
            return this.windowScrollY > 0 && this.windowInnerHeight < this.bodyScrollHeight;
        }

        private onViewportChange(): void {
            this.windowInnerHeight = window.innerHeight;
            this.windowScrollY = window.scrollY
            this.bodyScrollHeight = document.body.scrollHeight;
        }

        private onBackToTop(): void {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    }


</script>
