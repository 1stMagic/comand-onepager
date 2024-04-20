import {defineStore} from "pinia"
import axios from "axios"

export const useCmsStore = defineStore("cms", {
    state: () => ({
        languages: [],
        defaultMetaData: {},
        pages: [],
        currentLanguage: "de",
        pageContent: {},
        currentPageName: "",
        siteHeader: {},
        siteFooter: {},
        siteStructure: []
    }),
    getters: {
        mainNavigationEntries(state) {
            if (state.pages.length === 1) {
                return this.sectionEntries
            }
            return this.pageEntries
        },
        sections(state) {
            if (this.currentPage?.sections?.length > 0) {
                return this.currentPage.sections
                    .filter(section => section.show !== false)
                    .toSorted((section1, section2) => section1.order - section2.order)
            }
            return []
        },
        showSiteHeader(state) {
            return state.siteStructure.includes("siteHeader")
        },
        showSiteFooter(state) {
            return state.siteStructure.includes("siteFooter")
        },
        companyLogo(state) {
            return state.siteHeader.propsLogo || {}
        },
        metaData(state) {
            return {
                title: state.pages.find(page => page.id === state.currentPageName)?.navEntry,
                ...state.defaultMetaData,
                ...(this.currentPage?.metadata || {})
            }
        },
        currentPage(state) {
            return state.pageContent[state.currentPageName]
        },
        sectionEntries(state) {
            return this.currentPage?.sections
                ?.filter(section => section.showLinkInMainNavigation)
                ?.map(section => ({
                    iconClass: section.iconClass,
                    text: section.navEntry,
                    path: "#anchor-" + section.id,
                    type: "href",
                    active: location.hash === "#anchor-" + section.id
                }))
        },
        pageEntries(state) {
            return state.pages
                .filter(page => page.navigation?.includes("main"))
                .map(page => ({
                    iconClass: page.iconClass,
                    text: page.navEntry,
                    route: {
                        name: page.id,
                        params: {
                            lang: state.currentLanguage
                        }
                    },
                    type: "router"
                }))
        }
    },
    actions: {
        setLanguages(languages) {
            this.languages = languages || []
            if (!this.languages.includes(this.currentLanguage)) {
                this.setCurrentLanguage(this.languages?.[0] || "de")
            }
        },
        setDefaultMetaData(metaData) {
            this.defaultMetaData = metaData || {}
        },
        setCurrentLanguage(language) {
            this.currentLanguage = language
        },
        addPage(page) {
            this.pages.push(page)
        },
        setCurrentPageName(name) {
            this.currentPageName = name
        },
        loadPageContent(name) {
            if (this.pageContent[name]) {
                return
            }
            const url = new URL(`/templates/pages-${this.currentLanguage}/${name}.json`, location.href);
            axios(url.href)
                .then(response => response.data)
                .then(pageContent => this.pageContent[name] = pageContent)
        },
        loadSiteStructure(siteStructure) {
            this.siteStructure = siteStructure || []
            const url = new URL(`/templates/pages-${this.currentLanguage}/header-footer.json`, location.href);
            axios(url.href)
                .then(response => response.data)
                .then(structure => {
                    this.siteHeader = structure.siteHeader || {}
                    this.siteFooter = structure.siteFooter || {}
                })
        }
    }
})
