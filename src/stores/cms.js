import {defineStore} from "pinia"
import axios from "axios"

function findPageById(pages, id) {
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === id) {
            return pages[i]
        }
        if (pages[i].subEntries?.length > 0) {
            const page = findPageById(pages[i].subEntries, id)
            if (page) {
                return page
            }
        }
    }
    return null
}

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
        /**
         * return active/visible sections (of current page) only
         */
        activeSections() {
            return this.sections.filter(section => section.show !== false)
        },
        /**
         * return all existing sections (of current page)
         */
        sections() {
            return this.currentPageContent?.sections?.toSorted((section1, section2) => section1.order - section2.order) || []
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
                title: findPageById(state.pages, state.currentPageName)?.navEntry,
                ...state.defaultMetaData,
                ...(this.currentPageContent?.metadata || {})
            }
        },
        currentPage(state) {
            return findPageById(state.pages, state.currentPageName)
        },
        currentPageContent(state) {
            return state.pageContent[state.currentLanguage]?.[state.currentPageName]
        },
        sectionEntries(state) {
            return this.currentPageContent?.sections
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
            function filterbyNavigation(pages) {
                return (pages || [])
                    .filter(page => page.navigation?.includes("main"))
                    .map(page => ({
                        iconClass: page.iconClass,
                        text: page.navEntry,
                        ...navEntryType(page),
                        subentries: filterbyNavigation(page.subEntries)
                }))
            }
            function navEntryType(page) {
                if(!page.externalLink) {
                    return {
                        route: {
                            name: page.id,
                                params: {
                                lang: state.currentLanguage
                            }
                        },
                        type: "router",
                    }
                }
                return {
                    path: page.path,
                    type: "href",
                    target: "_blank"
                }
            }

            return filterbyNavigation(state.pages)
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
            if (this.pageContent[this.currentLanguage]?.[name]) {
                return
            }
            this.pageContent[this.currentLanguage] = {}
            const url = new URL(`/templates/pages-${this.currentLanguage}/${name}.json`, location.href);
            axios(url.href)
                .then(response => response.data)
                .then(pageContent => this.pageContent[this.currentLanguage][name] = pageContent)
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
        },
        updateMetaData(metaData) {
            // update meta data for current page
            this.currentPageContent.metadata = {...metaData}
        }
    }
})
