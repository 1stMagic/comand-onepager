<template>
    <ul class="cmd-content-item flex-container" v-if="editMode" style="display: none;">
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
            <a href="#" @click.prevent="" title="Save content of this component">
                <CmdIcon iconClass="icon-check" />
            </a>
            <a href="#" @click.prevent="" title="Edit content of this component">
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
                        <span>{{component.name}}</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
    <slot></slot>
</template>

<script>
import {CmdIcon} from "comand-component-library"
import components from "../assets/data/components.json"
import {usePiniaStore} from "../stores/pinia"
import {mapState} from "pinia"
export default {
    name: "CmdContentItem",
    data() {
        return {
            components
        }
    },
    components: {
        CmdIcon
    },
    computed: {
        ...mapState(usePiniaStore, ["editMode"])
    }
}
</script>

<style lang="scss">

</style>