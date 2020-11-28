<template>
    <div :class="htmlClass">
        <a href="http://www.comand-cms.com" target="_blank" lang="en" title="CoManD-Website">&copy; CoManD-OnePager</a>
    </div>
</template>

<script>
export default {
    name: "CopyrightWrapper",
    props: {
        htmlClass: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss">
/* >>> begin copyright-wrapper */
.grid-main-item-copyright-wrapper {
    padding: var(--default-padding);  /* margins for copyright-information */
    background: var(--text-color); /* background(-color) for #copyright-wrapper */
    border-top: var(--border-width) var(--border-style) var(--pure-white); /* border-top for #copyright-wrapper */
    text-align: center;

    a {
        text-decoration: none;

        &:hover, &:active, &:focus {
            text-decoration: underline;
        }
    }
}
/* >>> end copyright-wrapper */
</style>