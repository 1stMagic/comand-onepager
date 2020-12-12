<template>
    <div class="cmd-widget cmd-switch-language">
        <ul>
            <li v-for="(language, index) in languages" :key="index">
                <a href="#" :class="['flag', language.iso2, {'active': language.active}]" @click.prevent="switchLanguage(language.iso2)" :title="language.tooltip">
                    <img :src="getFlagURL(language.iso2)" :alt="language.name" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "CmdSwitchLanguage",
        props: {
            languages: {
                type: Array,
                required: true
            }
        },
        methods: {
            switchLanguage(iso2) {
                alert("Switch to " + iso2)
            },
            getFlagURL(isoCode) {
                return require("../assets/images/flags/flag-" + isoCode + ".svg")
            }
        }
    }
</script>

<style lang="scss">
    .cmd-switch-language {
        ul {
            display: flex;

            a {
                &:hover, &:active, &:focus, &.active {
                    box-shadow: var(--box-shadow);
                }
            }
        }
    }
</style>