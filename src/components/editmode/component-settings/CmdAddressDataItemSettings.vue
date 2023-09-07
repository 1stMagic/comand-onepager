<template>
    <div class="flex-container vertical component-settings-wrapper">
        <template v-if="name !== 'address'">
            <CmdFormElement
                element="input"
                type="text"
                labelText="Label text"
                placeholder="Label text"
                v-model="labelTextModel"
            />
            <CmdFormElement
                element="input"
                type="text"
                labelText="Displayed text/data"
                placeholder="Displayed text/data"
                v-model="dataModel"
            />
        </template>
        <template v-else>
            <CmdFormElement
                element="input"
                type="text"
                labelText="Label text"
                placeholder="Label text"
                v-model="labelTextModel"
            />

            <CmdFormElement
                element="input"
                type="text"
                labelText="streetNo"
                placeholder="streetNo"
                v-model="streetNoModel"
            />

            <div class="input-wrapper">
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Zip"
                    placeholder="Zip"
                    v-model="zipModel"
                />
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="City"
                    placeholder="City"
                    v-model="cityModel"
                />
            </div>

            <CmdFormElement
                element="input"
                type="text"
                labelText="Misc. Info"
                placeholder="Misc. Info"
                v-model="miscInfoModel"
            />

            <CmdFormElement
                element="input"
                type="checkbox"
                :toggleSwitch="true"
                labelText="Show country name"
                v-model="showCountryNameModel"
            />

            <CmdFormElement
                v-if="showCountryNameModel"
                element="select"
                labelText="Country"
                :selectOptions="countries"
                v-model="countryModel"
            />
        </template>

        <template v-if="canBeLinked">
            <CmdFormElement
                element="input"
                type="checkbox"
                :toggleSwitch="true"
                labelText="Link displayed text/data"
                v-model="linkDataModel"
            />
            <CmdFormElement
                v-if="linkDataModel"
                element="input"
                type="text"
                labelText="Href for displayed text/data"
                placeholder="Href for displayed text/data"
                v-model="hrefModel"
            />
            <CmdFormElement
                v-if="linkDataModel"
                element="input"
                type="text"
                labelText="Tooltip on hover/mouseover"
                placeholder="Tooltip on hover/mouseover"
                v-model="tooltipModel"
            />
        </template>
    </div>
</template>

<script>
export default {
    name: "CmdAddressDataItemSettings",
    inheritAttrs: false,
    data() {
        return {
            countries: [
                {text: 'Please select', value: ''},
                {text: 'Germany', value: 'de'},
                {text: 'United Kingdom', value: 'uk'}
            ],
            editableLabelText: null,
            editableData: null,
            editableLinkData: null,
            editableHref: null,
            editableTooltip: null,
            editableStreetNo: null,
            editableZip: null,
            editableCity: null,
            editableMiscInfo: null,
            editableShowCountryName: null,
            editableCountry: null
        }
    },
    props: {
        name: {
            type: String,
            default: ""
        },
        labelText: {
            type: String,
            default: ""
        },
        data: {
            type: String,
            default: ""
        },
        href: {
            type: String,
            default: ""
        },
        tooltip: {
            type: String,
            default: ""
        },
        streetNo: {
            type: String,
            default: ""
        },
        zip: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        miscInfo: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        }
    },
    computed: {
        canBeLinked() {
            switch (this.name) {
                case "telephone":
                case "mobilephone":
                case "email":
                case "website":
                    return true
                default:
                    return false
            }
        },
        labelTextModel: {
            get() {
                return (this.editableLabelText == null ? this.labelText : this.editableLabelText) || ""
            },
            set(value) {
                this.editableLabelText = value
            }
        },
        dataModel: {
            get() {
                return (this.editableData == null ? this.data : this.editableData) || ""
            },
            set(value) {
                this.editableData = value
            }
        },
        linkDataModel: {
            get() {
                return this.editableLinkData == null ? !!this.href : this.editableLinkData
            },
            set(value) {
                this.editableLinkData = value
            }
        },
        hrefModel: {
            get() {
                return (this.editableHref == null ? this.href : this.editableHref) || ""
            },
            set(value) {
                this.editableHref = value
            }
        },
        tooltipModel: {
            get() {
                return (this.editableTooltip == null ? this.tooltip : this.editableTooltip) || ""
            },
            set(value) {
                this.editableTooltip = value
            }
        },
        streetNoModel: {
            get() {
                return (this.editableStreetNo == null ? this.streetNo : this.editableStreetNo) || ""
            },
            set(value) {
                this.editableStreetNo = value
            }
        },
        zipModel: {
            get() {
                return (this.editableZip == null ? this.zip : this.editableZip) || ""
            },
            set(value) {
                this.editableZip = value
            }
        },
        cityModel: {
            get() {
                return (this.editableCity == null ? this.city : this.editableCity) || ""
            },
            set(value) {
                this.editableCity = value
            }
        },
        miscInfoModel: {
            get() {
                return (this.editableMiscInfo == null ? this.miscInfo : this.editableMiscInfo) || ""
            },
            set(value) {
                this.editableMiscInfo = value
            }
        },
        showCountryNameModel: {
            get() {
                return this.editableShowCountryName == null ? !!this.country : this.editableShowCountryName
            },
            set(value) {
                this.editableShowCountryName = value
            }
        },
        countryModel: {
            get() {
                return (this.editableCountry == null ? this.country : this.editableCountry) || ""
            },
            set(value) {
                this.editableCountry = value
            }
        }
    },
    methods: {
        updateCallbackProvider() {
            const labelText = this.labelTextModel
            const data = this.dataModel
            const linkData = this.linkDataModel
            const href = this.hrefModel
            const tooltip = this.tooltipModel
            const streetNo = this.streetNoModel
            const zip = this.zipModel
            const city = this.cityModel
            const miscInfo = this.miscInfoModel
            const showCountryName = this.showCountryNameModel
            const country = this.countryModel

            return props => {
                if (props.name !== "address") {
                    props.labelText = labelText
                    props.data = data
                    props.href = href
                    props.tooltip = tooltip

                    if (!linkData) {
                        props.href = null
                    }
                } else {
                    props.streetNo = streetNo
                    props.zip = zip
                    props.city = city
                    props.miscInfo = miscInfo
                    props.country = country

                    if (!showCountryName) {
                        props.country = null
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>