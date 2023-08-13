import {defineStore} from "pinia"
import {i18nClient} from "../api/I18nClient"
import axios from "axios"
import {createUuid} from "comand-component-library"

function findComponent(site, componentFinders) {
    let component = null
    if (Array.isArray(componentFinders) && componentFinders.length > 0) {
        for (let i = 0, c = componentFinders.length; i < c; i++) {
            component = componentFinders[i](component || site)
            if (component == null) {
                return null
            }
        }
    }
    return component
}

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
        componentEditMode: false
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
            return state.site.main?.sections?.filter(section => section.show !== false) || []
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
        },
        updateContent(componentFinders, updateHandlers) {
            const component = findComponent(this.site, componentFinders)
            if (!component) {
                return
            }

            updateHandlers.forEach((updateHandler, index) => invokeUpdateHandler(component, updateHandler, index))

            function invokeUpdateHandler(component, updateHandler, index) {
                if (updateHandler.processed) {
                    return
                }
                if (typeof updateHandler.update === "function") {
                    updateHandler.update(component.props || component)
                }
                if (typeof updateHandler.handleChildUpdate === "function" && updateHandlers.length > index + 1) {
                    updateHandlers.slice(index + 1).forEach(childUpdateHandler => invokeChildUpdateHandler(component, updateHandler, childUpdateHandler))
                }
            }

            function invokeChildUpdateHandler(component, updateHandler, childUpdateHandler) {
                if (typeof childUpdateHandler.update === "function") {
                    childUpdateHandler.processed = !!updateHandler.handleChildUpdate(component.props || component, childUpdateHandler)
                }
            }
        },
        updateSettings(componentFinders, updateCallback) {
            const component = findComponent(this.site, componentFinders)
            if (component) {
                updateCallback(component.props || component)
            }
        }
    }
})
