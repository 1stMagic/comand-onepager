import {defineStore} from "pinia"
import {i18nClient} from "../api/I18nClient"
import axios from "axios"
import {createUuid} from "comand-component-library"

export const usePiniaStore = defineStore("pinia", {
    state: () => ({
        site: {},
        fancybox: {
            status: false,
            img: false,
            images: [],
            imgIndex: 0,
            content: ""
        },
        languages: [],
        languageLabels: {},
        currentLanguage: 'de',
        editMode: true,
        mainHeadline: true,
        authToken: "",
        componentIdentifier: ""
    }),
    getters: {
        labels(state) {
            if (state.languageLabels[state.currentLanguage]) {
                return state.languageLabels[state.currentLanguage]
            }
            return {}
        },
        // create getter to assure all information is loaded when site renders
        slideshow(state) {
            if(state.site.main?.slideshow) {
                return state.site.main.slideshow
            }
            return {}
        },
        // create getter to assure all information is loaded when site renders
        companyLogo(state) {
            if(state.site.siteHeader?.propsLogo) {
                return state.site.siteHeader?.propsLogo
            }
            return {}
        },
        sections(state) {
            return state.site.main?.sections.filter(section => {
                if(section.show !== false) {
                    return true
                }
                return false
            }) || []
        }
    },
    actions: {
        activateEditMode() {
            this.editMode = true
        },
        deactivateEditMode() {
            this.editMode = false
        },
        setAuthToken(token) {
            this.authToken = token
        },
        deleteAuthToken() {
            this.authToken = ""
        },
        setComponentIdentifier(componentIdentifier) {
            this.componentIdentifier = componentIdentifier
        },
        loadLabels() {
            i18nClient.getLanguagesAndLabels()
                .then(([languages, labels]) => {
                    this.languages = languages
                    this.languageLabels = labels
                })
                .catch(e => {
                    console.error('Error loading labels', e)
                    this.languages = []
                    this.languageLabels = {}
                    this.currentLanguage = ''
                })
        },
        loadSections() {
            axios.get("/templates/pages/data/content-sections-" + this.currentLanguage + '.json')
                .then(response => this.sections = response.data)
                .catch(() => this.sections = [])
        },
        loadSite() {
            axios.get("/templates/pages/data/site-" + this.currentLanguage + '.json')
                .then(response => this.site = response.data)
                .catch(() => this.site = {})
        },
        updateMainHeadlineState(showMainHeadline) {
            this.mainHeadline = showMainHeadline
        },
        updateSectionComponent(sectionId, componentIndex, updateProps) {
            const section = this.sections.find(section => section.id === sectionId)
            if (section && section.components?.length > componentIndex) {
                updateProps(section.components[componentIndex].props)
            }
        },
        updateContentSection(sectionId, sectionData) {
            // find index of section to update in sections-array/-state
            const sectionIndex = this.sections.findIndex((item) => {
                return item.id === sectionId
            })

            if(sectionIndex === -1) {
                alert("No section found!")
                return
            }

            // assign old section-object to new one and overwrite some keys by sectionData
            this.sections[sectionIndex] = {...this.sections[sectionIndex], ...sectionData}
        },
        deleteContentSection(sectionId) {
            // find index of section to delete in sections-array/-state
            const sectionIndex = this.sections.findIndex((item) => {
                return item.id === sectionId
            })

            if(sectionIndex === -1) {
                return
            }
            // delete section from sections-array/-state
            this.sections.splice(sectionIndex, 1)
        },
        addContentSection() {
          this.sections.unshift(
              {
                  id: createUuid(),
                  iconClass: "",
                  navEntry: "Neue Sektion",
                  headline: "Überschrift Neue Sektion",
                  content: "<p>Placeholder</p>"
              }
          )
        }
    }
})
