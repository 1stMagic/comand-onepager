import {defineStore} from "pinia"
import {i18nClient} from "../api/I18nClient"
import axios from "axios"
import {createUuid} from "comand-component-library"

function findComponent(site, componentPath) {
    if (!(site && Array.isArray(componentPath) && componentPath.length > 0)) {
        return null
    }

    let node = site
    for (let i = 0, c = componentPath.length; i < c; i++) {
        if (typeof componentPath[i] === "object") {
            if (!Array.isArray(node)) {
                return null
            }
            node = node.find(childNode => propsMatch(childNode, componentPath[i]))
        } else {
            node = node?.[componentPath[i]]
        }
        if (!node) {
            return null
        }
    }
    return node
}

function propsMatch(node, props) {
    if (typeof node === "object") {
        const entries = Object.entries(props)
        for (let i = 0, c = entries.length; i < c; i++) {
            const [name, value] = entries[i]
            if (node[name] !== value) {
                return false
            }
        }
        return true
    }
    return false
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
        updateContent(componentPath, updateHandlers) {
            const component = findComponent(this.site, componentPath)
            if (!component || !Array.isArray(updateHandlers) || updateHandlers.length === 0) {
                return
            }
            const childUpdateHandlers = []
            if (updateHandlers.length > 1) {
                childUpdateHandlers.push(...updateHandlers.slice(1))
            }
            const updateHandler = updateHandlers[0].update
            if (typeof updateHandler === "function") {
                updateHandler(component.props || component, childUpdateHandlers)
            }
        },
        updateSettings(componentPath, updateCallback) {
            const component = findComponent(this.site, componentPath)
            if (component) {
                updateCallback(component.props || component)
            }
        }
    }
})
