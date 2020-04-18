<template>
    <div class="section_wrapper">
        <a v-bind:id="'anchor_' + id"></a>
        <section>
            <h2>{{ headline }}</h2>
            <div v-html="content"></div>
            <slot></slot>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContentSection extends Vue {
    @Prop() id;
    @Prop() headline;
    @Prop() content;
}

</script>