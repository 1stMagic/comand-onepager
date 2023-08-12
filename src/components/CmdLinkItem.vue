<template>
    <li v-if="!editModeContext?.editing" class="cmd-link-item">
    <!-- begin use href -->
    <a v-if="link.type === 'href' || link.type === undefined"
       :href="link.path"
       :target="link.target"
       @click="executeLink(link, $event)"
       :title="link.tooltip && link.tooltip !== undefined ? link.tooltip : undefined">
        <!-- begin CmdIcon -->
        <CmdIcon v-if="link.iconClass" :iconClass="link.iconClass" :type="link.iconType" />
        <!-- end CmdIcon -->
        <span v-if="link.text">{{ link.text }}</span>
    </a>
    <!-- end use href --->

    <!-- begin use router-link -->
    <router-link v-else-if="link.type === 'router'"
                 :to="getRoute(link)"
                 :title="link.tooltip">
        <!-- begin CmdIcon -->
        <CmdIcon v-if="link.iconClass" :iconClass="link.iconClass" :type="link.iconType" />
        <!-- end CmdIcon -->
        <span v-if="link.text">{{ link.text }}</span>
    </router-link>
    <!-- end use router-link -->
    </li>

    <!-- begin edit-mode -->
    <template v-else>
        <div class="input-wrapper">
            <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Linktext"
                    placeholder="Linktext"
                    v-model="editableText"
            />
        </div>
    </template>
    <!-- end edit-mode -->
</template>

<script>
export default {
    name: "CmdLinkItem",
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            editableText: this.link.text
        }
    },
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * single link
         */
        link: {
            type: Object,
            required: false
        }
    },
    mounted() {
        this.editModeContext?.addSaveHandler(this.onSave)
        this.editModeContext?.addDeleteHandler(this.onDelete)
    },
    methods: {
        onSave() {
            const data = {
                link: {
                    text: this.editableText
                }
            }
            console.log("LinkItem.save()", data)
            return {
                editModeContextData: this.editModeContextData,
                ...data
            }
        },
        onDelete() {
            return {
                editModeContextData: this.editModeContextData
            }
        }
    }
}
</script>