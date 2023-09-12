<template>
    <div class="cmd-address-data vcard">
        <!-- begin slot -->
        <template v-if="useSlot">
            <slot></slot>
        </template>
        <!-- end slot -->

        <template v-else>
            <!-- begin cmd-headline -->
            <CmdHeadline
                v-if="cmdHeadline?.headlineText || editing"
                v-bind="cmdHeadline"
            />
            <!-- end cmd-headline -->

            <!-- begin address-data in vCard microformat -->
            <address class="adr">
                <!-- begin list with labels -->
                <template v-if="showLabels && !showIconsOnly">
                    <!-- begin default view -->
                    <dl v-if="!editModeContext">
                        <CmdAddressDataItem
                            v-for="(entry, index) in addressData"
                            :key="index"
                            :addressEntry="entry"
                        />
                    </dl>
                    <!-- end default view -->

                    <!-- begin edit-mode -->
                    <EditComponentWrapper
                        v-else
                        v-for="(entry, index) in addressData"
                        :key="'x' + index"
                        class="edit-items"
                        :showComponentName="false"
                        componentName="CmdAddressDataItem"
                        :componentProps="entry"
                        :componentPath="['props', 'addressData', index]"
                    >
                        <dl>
                            <CmdAddressDataItem
                                :addressEntry="entry"
                                :showLabelIcons="showLabelIcons"
                                :showLabelTexts="showLabelTexts"
                                :linkGoogleMaps="linkGoogleMaps"
                            />
                        </dl>
                    </EditComponentWrapper>
                </template>
                <!-- end list with labels -->

                <!-- begin list without labels -->
                <ul v-else :class="['flex-container', {'vertical': !showIconsOnly}]">
                    <template v-for="(entry, index) in addressData" :key="index">
                        <template v-if="entry.href || entry.name === 'address' || !showIconsOnly">
                            <li :class="{'no-flex' : showIconsOnly}">
                                <!-- begin all entries except address (which has no href) -->
                                <a v-if="entry.href" :href="getHref(entry)"
                                   :target="{'_blank' : entry.name === 'website'}"
                                   :title="entry.tooltip">
                                    <template v-if="showIconsOnly">
                                        <!-- begin CmdIcon -->
                                        <CmdIcon
                                                v-if="entry.iconClass"
                                                :iconClass="entry.iconClass"
                                                :type="entry.iconType"
                                        />
                                        <!-- end CmdIcon -->
                                    </template>
                                    <template v-else>{{ entry.href }}</template>
                                </a>
                                <span v-else-if="!showIconsOnly" v-html="entry.data"></span>
                                <!-- end all entries except address -->

                                <!-- begin address -->
                                <template v-if="entry.name === 'address'">
                                    <!-- begin linked address -->
                                    <a v-if="linkGoogleMaps" :href="locateAddress(entry)" target="google-maps"
                                       :title="entry.tooltip">
                                        <template v-if="showIconsOnly">
                                            <!-- begin CmdIcon -->
                                            <CmdIcon
                                                    v-if="entry.iconClass"
                                                    :iconClass="entry.iconClass"
                                                    :type="entry.iconType"
                                            />
                                            <!-- end CmdIcon -->
                                        </template>
                                        <template v-else>
                                            <!-- begin street/number -->
                                            <template v-if="entry.streetNo">
                                                <span class="street-address">{{ entry.streetNo }}</span><br/>
                                            </template>
                                            <!-- end street/number -->

                                            <!-- begin zip/city -->
                                            <template v-if="entry.zip || entry.city">
                                                <span class="postal-code">{{ entry.zip }}&nbsp;</span>
                                                <span class="locality">{{ entry.city }}</span><br/>
                                            </template>
                                            <!-- end zip/city -->

                                            <!-- begin miscInfo -->
                                            <template v-if="entry.miscInfo">
                                                <span>{{ entry.miscInfo }}</span><br/>
                                            </template>
                                            <!-- end miscInfo -->

                                            <!-- begin country -->
                                            <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                                            <!-- end country -->
                                        </template>
                                    </a>
                                    <!-- end linked address -->

                                    <!-- begin unlinked address -->
                                    <template v-if="!linkGoogleMaps && !showIconsOnly">
                                        <!-- begin street/number -->
                                        <template v-if="entry.streetNo">
                                            <span class="street-address">{{ entry.streetNo }}</span><br/>
                                        </template>
                                        <!-- end street/number -->

                                        <!-- begin zip/city -->
                                        <template v-if="entry.zip || entry.city">
                                            <span class="postal-code">{{ entry.zip }}&nbsp;</span>
                                            <span class="locality">{{ entry.city }}</span><br/>
                                        </template>
                                        <!-- end zip/city -->

                                        <!-- begin miscInfo -->
                                        <template v-if="entry.miscInfo">
                                            <span>{{ entry.miscInfo }}</span><br/>
                                        </template>
                                        <!-- end miscInfo -->

                                        <!-- begin country -->
                                        <span v-if="entry.country" class="country-name">{{ entry.country }}</span>
                                        <!-- end country -->
                                    </template>
                                    <!-- end unlinked address -->
                                </template>
                                <!-- end address -->
                            </li>
                        </template>
                        <!-- end all entries except address -->
                    </template>
                    <!-- end v-for -->
                </ul>
                <!-- end list without labels -->
            </address>
            <!-- end address-data in vCard microformat -->
        </template>
    </div>
</template>

<script>
import EditMode from "./mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js";

// import mixins
//import I18n from "../mixins/I18n"
//import DefaultMessageProperties from "../mixins/CmdAddressData/DefaultMessageProperties"

export default {
    name: "CmdAddressData",
    //  mixins: [I18n, DefaultMessageProperties],
    mixins: [EditMode],
    props: {
        /**
         * activate if you want to use slot instead for given structure
         */
        useSlot: {
            type: Boolean,
            default: false
        },
        /**
         * show an icon (if exists) in front of label-text
         */
        showLabelIcons: {
            type: Boolean,
            default: true
        },
        /**
         * show a label-text for each entry
         */
        showLabelTexts: {
            type: Boolean,
            default: false
        },
        /**
         * activate if only icons (without any text) should be displayed
         */
        showIconsOnly: {
            type: Boolean,
            default: false
        },
        /**
         * option to toggle labels (i.e. telephone, email etc.) in front/left of data
         */
        showLabels: {
            type: Boolean,
            default: true
        },
        /**
         * all address-data (incl. labels) that will be shown
         */
        addressData: {
            type: Object,
            required: true
        },
        /**
         * link physical address (street, no, zip and city) with Google Maps
         */
        linkGoogleMaps: {
            type: Boolean,
            default: false
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            editableAddressData: []
        }
    },
    computed: {
        websiteUrlText() {
            return this.addressData.website?.text.replace("https://", "")
        }
    },
    methods: {
        getHref(entry) {
            if (entry.name === "telephone" || entry.name === "mobilephone") {
                return "tel:" + entry.href
            }
            if (entry.name === "email") {
                return "mailto:" + entry.href
            }
            if (entry.name === "website") {
                return entry.href
            }
            return null
        },
        updateHandlerProvider() {
            return updateHandlerProvider(this, {
                update(props, childUpdateHandlers) {
                    const cmdHeadlineUpdateHandler = childUpdateHandlers?.find(handler => handler.name === "CmdHeadline")
                    if (cmdHeadlineUpdateHandler) {
                        props.cmdHeadline = props.cmdHeadline || {}
                        cmdHeadlineUpdateHandler.update(props.cmdHeadline)
                    }
                }
            })
        }
    },
    watch: {}
}
</script>

<style lang="scss">
/* begin cmd-address-data ---------------------------------------------------------------------------------------- */
.cmd-address-data {
    dl {
        grid-row-gap: calc(var(--default-gap) / 2);

        dt {
            display: flex;
            align-items: center;

            &.address {
                align-self: flex-start;

                [class*="icon"]:only-child {
                    line-height: var(--line-height);
                }
            }
        }
    }

    ul {
        gap: calc(var(--default-gap) / 2);

        li {
            margin-left: 0;
            list-style: none;
        }
    }

    .edit-component-wrapper {
        dl {
            margin-bottom: 0;
        }
    }
}

.edit-component-wrapper .cmd-address-data address {
    display: flex;
    flex-direction: column;
    gap: calc(var(--default-gap) / 2);

    dt {
        min-width: 2.5rem;
    }
}

/* end cmd-address-data ------------------------------------------------------------------------------------------ */
</style>
