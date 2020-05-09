import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {i18nClient} from '@/api/I18nClient';
import {Labels, LanguageLabels, ContentSection} from '@/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sections: [] as ContentSection[],
    fancybox: {
        status: false,
        img: false,
        images: [],
        imgIndex: 0,
        content: ""
    },
    languages: [] as string[],
    labels: {} as Labels,
    currentLanguage: ''
  },
  getters: {
    labels(state): LanguageLabels {
        if (state.labels[state.currentLanguage]) {
            return state.labels[state.currentLanguage];
        }
        return {};
    }
  },
  mutations: {
    setSections(state, sections) {
        state.sections = sections;
    },

    setFancybox(state, fancboxFeatures) {
        state.fancybox = fancboxFeatures;
    },

    languages(state, languages: string[]) {
        state.languages = languages;
    },

    labels(state, labels: Labels) {
        state.labels = labels;
    },

    currentLanguage(state, language: string) {
        state.currentLanguage = language;
    }
  },
  actions: {
    loadSections(store) {
        axios.get(process.env.BASE_URL + 'templates/pages/data/content_sections_' + store.state.currentLanguage + '.json')
            .then(response => store.commit('setSections', response.data))
            .catch(error => store.commit('setSections', []));
    },

    loadFancyboxContent(store, content) {
        if (!content.img) {
            axios.get(content.url)
                .then(response => store.commit('setFancybox', {status: true, img: false, content: response.data})) // if success
                .catch(error => store.commit('setFancybox', {status: false, img: false})); // if error
            }  else {
                store.commit('setFancybox', {status: true, img: true, images: content.urls, imgIndex: content.imgIndex});
        }
    },

    loadLabels({commit}) {
        i18nClient.getLanguagesAndLabels()
          .then(([languages, labels]) => {
              commit('languages', languages);
              commit('labels', labels);
          })
          .catch(e => {
              console.error('Error loading labels', e);
              commit('languages', []);
              commit('labels', []);
              commit('currentLanguage', '');
          });
    }
  },
  modules: {
  }
})
