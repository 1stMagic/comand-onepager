import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sections: [],
    fancybox: {
        status: false,
        img: false,
        images: [],
        imgIndex: 0,
        content: ""
    }
  },
  mutations: {
    setSections(state, sections) {
        state.sections = sections;
    },

    setFancybox(state, fancboxFeatures) {
        state.fancybox = fancboxFeatures;
    }
  },
  actions: {
    loadSections(store) {
        axios.get(process.env.BASE_URL + 'templates/pages/data/content_sections.json')
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
    }
  },
  modules: {
  }
})
