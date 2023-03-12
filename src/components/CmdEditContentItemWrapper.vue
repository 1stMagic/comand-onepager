<template>
    <ul class="cmd-edit-content-item-wrapper flex-container">
        <li>
            <a href="#" @click.prevent="" title="Delete this component (and its content)">
                <CmdIcon iconClass="icon-trash" />
            </a>
        </li>
        <li>
            <a href="#" @click.prevent="" title="Cancel editing (changes will not be saved)">
                <CmdIcon iconClass="icon-cancel" />
            </a>
        </li>
        <li>
            <a v-if="editMode" href="#" @click.prevent="" title="Save content of this component">
                <CmdIcon iconClass="icon-check" />
            </a>
            <a v-else href="#" @click.prevent="" title="Edit content of this component">
                <CmdIcon iconClass="icon-edit" />
            </a>
        </li>
        <li>
            <a href="#" @click.prevent="" title="Edit settings of this component">
                <CmdIcon iconClass="icon-cog" />
            </a>
        </li>
        <li>
            <a href="#" @click.prevent title="Select a component">
                <CmdIcon iconClass="icon-globe" />
            </a>
            <ul>
                <li v-for="(component, index) in components" :key="index">
                    <a href="#" @click.prevent>
                        <span>{{component}}</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import {usePiniaStore} from "../stores/pinia"
import {mapState} from "pinia"
export default {
    name: "CmdContentItem",
    props: {
        components: {
            type: Array,
            required: false
        }
    },
    computed: {
        ...mapState(usePiniaStore, ["editMode"])
    }
}
</script>

<style lang="scss">

</style>